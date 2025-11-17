import api from "./axiosClient"

export function register(data) {
    return api.post("/auth/register", data)
}

export function login(data) {
    return api.post("/auth/login", data)
}

export function logout() {
    return api.post("/auth/logout")
}