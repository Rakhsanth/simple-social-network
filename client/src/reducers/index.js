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
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
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
        case 'PROFILE_ERROR':
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
                loading: false,
            };
        default:
            return state;
    }
};

export default combineReducers({
    alerts,
    auth,
    profile,
});
