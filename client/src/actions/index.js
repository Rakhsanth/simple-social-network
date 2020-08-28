import axios from 'axios';

// utils

// Alert actions
// Async action
export const setAlert = (message, color, timeout = 3000) => {
    return function (dispatch) {
        dispatch({ type: 'SET_ALERT', payload: { message, color } });
        setTimeout(
            () => dispatch({ type: 'REMOVE_ALERT', payload: {} }),
            timeout
        );
    };
};

// Register actions
// Async action
export const register = (name, email, password) => {
    return async function (dispatch) {
        let body = {
            name,
            email,
            password,
        };
        body = JSON.stringify(body);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        try {
            const response = await axios.post(
                `http://localhost:4010/api/v1/auth/register`,
                body,
                config
            );
            console.log(response.data);
            dispatch({
                type: 'REGISTER_SUCCESS',
                payload: { token: response.data.token },
            });
            dispatch(loadUser());
        } catch (err) {
            console.log(err.response.data);
            dispatch(setAlert(err.response.data.data, 'danger'));
            dispatch({
                type: 'REGISTER_FAIL',
            });
        }
    };
};
// Login actions
// Async action
export const login = (email, password) => {
    return async function (dispatch) {
        let body = {
            email,
            password,
        };
        body = JSON.stringify(body);

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        try {
            const response = await axios.post(
                `http://localhost:4010/api/v1/auth/login`,
                body,
                config
            );
            console.log(response);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { token: response.data.token },
            });
            dispatch(loadUser());
        } catch (err) {
            console.log('Shit It cam ehere');
            console.log(err.response);
            dispatch(setAlert(err.response.data.data, 'danger'));
            dispatch({
                type: 'LOGIN_FAIL',
            });
        }
    };
};
// Facebook login actions
export const facebookLogin = (name, avatar, facebookId) => {
    return async function (dispatch) {
        let body = {
            facebookUser: true,
            name,
            avatar,
            facebookId,
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        };
        try {
            const response = await axios.post(
                `http://localhost:4010/api/v1/auth/facebookLogin`,
                body,
                config
            );
            console.log(response);
            dispatch({
                type: 'FACEBOOK_LOGIN_SUCCESS',
                payload: { token: response.data.token },
            });
            dispatch(loadUser());
        } catch (err) {
            console.log('Shit It cam ehere');
            console.log(err.response);
            dispatch(setAlert(err.response.data.data, 'danger'));
            dispatch({
                type: 'FACEBOOK_LOGIN_FAIL',
            });
        }
    };
};
// Normal action for logout
export const logout = () => {
    return function (dispatch) {
        dispatch({ type: 'LOGOUT' });
        dispatch({ type: 'CLEAR_PROFILE' });
    };
};
// load User on every component page loads action
export const loadUser = () => {
    return async function (dispatch) {
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.get(
                `http://localhost:4010/api/v1/auth/me`,
                config
            );
            dispatch({ type: 'USER_LOADED', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'AUTH_ERROR' });
        }
    };
};
// Get current user's profile
export const getCurrentProfile = () => {
    return async function (dispatch) {
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.get(
                `http://localhost:4010/api/v1/profiles/me`,
                config
            );
            dispatch({ type: 'GET_PROFILE', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};
// Get all profiles
export const getProfiles = () => {
    return async function (dispatch) {
        dispatch({ type: 'CLEAR_PROFILE' });
        try {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            //     withCredentials: true,
            // };
            const response = await axios.get(
                `http://localhost:4010/api/v1/profiles`
                // config
            );
            dispatch({ type: 'GET_PROFILES', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};
// Get profile by user ID
export const getProfileByUserId = (userId) => {
    return async function (dispatch) {
        try {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            //     withCredentials: true,
            // };
            const response = await axios.get(
                `http://localhost:4010/api/v1/profiles/users/${userId}`
                // config
            );
            dispatch({ type: 'GET_PROFILE', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};
// Get Github Repositories
export const getGithubRepos = (username) => {
    return async function (dispatch) {
        try {
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            //     withCredentials: true,
            // };
            const response = await axios.get(
                `http://localhost:4010/api/v1/profiles/github/${username}`
                // config
            );
            dispatch({ type: 'GET_REPOS', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};
// Create New Profile or update profile details action
export const createProfile = (
    formValues,
    history,
    edit = false,
    expOrEdu = '',
    profile
) => {
    return async function (dispatch) {
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        console.log(formValues);
        let body = {};
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            let response;
            if (expOrEdu === 'exp') {
                body.skills = profile.skills.join(',');
                body.status = profile.status;
                body.experience = profile.experience;
                let experience;
                if (formValues.current.length === 0) {
                    experience = { ...formValues, current: false };
                } else {
                    experience = { ...formValues, current: true };
                }
                body.experience.push(experience);
                body.overwrite = false;
                response = await axios.put(
                    `http://localhost:4010/api/v1/profiles`,
                    body,
                    config
                );
            } else if (expOrEdu === 'edu') {
                body.skills = profile.skills.join(',');
                body.status = profile.status;
                body.education = profile.education;
                let education;
                if (formValues.current.length === 0) {
                    education = { ...formValues, current: false };
                } else {
                    education = { ...formValues, current: true };
                }
                body.education.push(education);
                body.overwrite = false;
                response = await axios.put(
                    `http://localhost:4010/api/v1/profiles`,
                    body,
                    config
                );
            } else {
                body = formValues;
                if (edit) {
                    // body.overwrite = true;
                    response = await axios.put(
                        `http://localhost:4010/api/v1/profiles`,
                        body,
                        config
                    );
                } else {
                    response = await axios.post(
                        `http://localhost:4010/api/v1/profiles`,
                        body,
                        config
                    );
                }
            }
            console.log(response.data.data);
            dispatch({ type: 'GET_PROFILE', payload: response.data.data });
            history.push('/dashboard');
            dispatch(
                setAlert(
                    edit
                        ? 'Profile updated successfully'
                        : 'Profile created successfully',
                    'success'
                )
            );
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};
// delete experiences or education in profile action
export const deleteExpOrEdu = (listToUpdate, expOrEdu, profile) => {
    return async function (dispatch) {
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        console.log(listToUpdate);
        let body = {};
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            let response;
            if (expOrEdu === 'exp') {
                body.skills = profile.skills.join(',');
                body.status = profile.status;
                body.experience = listToUpdate;
                body.overwrite = false;
                response = await axios.put(
                    `http://localhost:4010/api/v1/profiles`,
                    body,
                    config
                );
            } else if (expOrEdu === 'edu') {
                body.skills = profile.skills.join(',');
                body.status = profile.status;
                body.education = listToUpdate;
                body.overwrite = false;
                response = await axios.put(
                    `http://localhost:4010/api/v1/profiles`,
                    body,
                    config
                );
            }
            console.log(response.data.data);
            dispatch({ type: 'GET_PROFILE', payload: response.data.data });
            dispatch(setAlert('Profile updated successfully', 'success'));
        } catch (err) {
            console.log(err);
            console.log(err.response.data);
            dispatch({ type: 'PROFILE_ERROR', payload: err.response.data });
        }
    };
};

// Get all posts action
export const getAllPosts = (pageNumber = 1) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.get(
                `http://localhost:4010/api/v1/posts?page=${pageNumber}`,
                axiosConfig
            );
            dispatch({ type: 'GET_POSTS', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Get single post by ID action
export const getPost = (postId) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.get(
                `http://localhost:4010/api/v1/posts/${postId}`,
                axiosConfig
            );
            dispatch({ type: 'GET_POST', payload: response.data.data });
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Adding likes action
export const addLikes = (postId) => {
    return async function (dispatch) {
        try {
            console.log(postId);
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            console.log(token);
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.put(
                `http://localhost:4010/api/v1/posts/likes/${postId}`,
                {},
                axiosConfig
            );
            dispatch({
                type: 'ADD_LIKES',
                payload: { postId, likes: response.data.data },
            });
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Adding create post action
export const createPost = (formValue) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            console.log(token);
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const body = formValue;
            const response = await axios.post(
                `http://localhost:4010/api/v1/posts`,
                body,
                axiosConfig
            );
            dispatch({
                type: 'CREATE_POST',
                payload: response.data.data,
            });
            dispatch(setAlert('Post successfully deleted', 'success'));
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Adding delete post action
export const deletePost = (postId) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            console.log(token);
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            await axios.delete(
                `http://localhost:4010/api/v1/posts/${postId}`,
                axiosConfig
            );
            dispatch({
                type: 'DELETE_POST',
                payload: { postId },
            });
            dispatch(setAlert('Post successfully deleted', 'success'));
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Add a comment action
export const addComment = (postId, formValue) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            console.log(token);
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const body = formValue;
            const response = await axios.post(
                `http://localhost:4010/api/v1/posts/comments/${postId}`,
                body,
                axiosConfig
            );
            dispatch({
                type: 'CREATE_COMMENT',
                payload: response.data.data,
            });
            dispatch(setAlert('Comment successfully added', 'success'));
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
// Adding delete post action
export const deleteComment = (postId, commentId) => {
    return async function (dispatch) {
        try {
            let token;
            if (localStorage.token) {
                token = localStorage.getItem('token');
            }
            console.log(token);
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            await axios.delete(
                `http://localhost:4010/api/v1/posts/comments/${postId}/${commentId}`,
                axiosConfig
            );
            dispatch({
                type: 'DELETE_COMMENT',
                payload: commentId,
            });
            dispatch(setAlert('Post successfully deleted', 'success'));
        } catch (err) {
            dispatch({ type: 'POST_ERROR', payload: err.response.data });
            dispatch(setAlert(err.response.data.data, 'danger'));
        }
    };
};
