import api from "./axiosClient"

function register(data) {
    return api.post("/auth/register", data)
}

function login(data) {
    return api.post("/auth/login", data)
}

function logout() {
    return api.post("/auth/logout")
}