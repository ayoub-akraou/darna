import { createContext, useContext, useReducer } from "react";

const initialState = {
	isAuthenticated: false,
	user: null,
	token: localStorage.getItem("token") || null,
	loading: true,
	error: null,
};

function authReducer(state, action) {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
            };
        case "REGISTER_FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: action.payload.error,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: action.payload.error,
            };
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
}

const AuthContext = createContext(initialState);

export default function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
