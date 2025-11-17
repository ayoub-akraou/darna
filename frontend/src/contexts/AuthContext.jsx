import { createContext, useContext, useReducer } from "react";

const initialState = {
	isAuthenticated: false,
	user: null,
	token: localStorage.getItem("token") || null,
	loading: true,
	error: null,
};


const AuthContext = createContext(initialState);

export default function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialState);
	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}
