import { combineReducers } from 'redux';

// Alert reducer
const alerts = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_ALERT':
            return payload;
        case 'REMOVE_ALERT':
            return payload;
        default:
            return state;
    }
};

// User Auth related reducer
const initialAuthState = {
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
};
const auth = (state = initialAuthState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case 'REGISTER_SUCCESS':
        case 'LOGIN_SUCCESS':
        case 'FACEBOOK_LOGIN_SUCCESS':
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'FACEBOOK_LOGIN_FAIL':
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        default:
            return state;
    }
};

// Profile related state:
const initialProfileState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};
const profile = (state = initialProfileState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_PROFILE':
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case 'GET_PROFILES':
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        case 'GET_REPOS':
            return {
                ...state,
                repos: payload,
                loading: false,
            };
        case 'PROFILE_ERROR':
            if (payload.data === 'No matching profile found') {
                return {
                    ...state,
                    profile: null,
                    error: payload,
                    loading: false,
                };
            }
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case 'CLEAR_PROFILE':
            return {
                ...state,
                profile: null,
                repos: [],
                loading: true,
            };
        default:
            return state;
    }
};

// Posts reducer
const initialPostState = {
    posts: [],
    post: null,
    loading: true,
    error: {},
};
const post = (state = initialPostState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case 'GET_POST':
            return {
                ...state,
                post: payload,
                loading: false,
            };
        case 'CREATE_POST':
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            };
        case 'ADD_LIKES':
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.postId
                        ? { ...post, likes: payload.likes }
                        : post
                ),
                loading: false,
            };
        case 'CREATE_COMMENT':
            return {
                ...state,
                post: { ...state.post, comments: payload },
            };
        case 'DELETE_COMMENT':
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.map(
                        (comment) => comment._id !== payload
                    ),
                },
            };
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== payload.postId
                ),
                loading: false,
            };
        case 'POST_ERROR':
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return { ...state };
    }
};

export default combineReducers({
    alerts,
    auth,
    profile,
    post,
});
