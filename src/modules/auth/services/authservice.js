// import { api } from "../../../shared/api/apiClient";

import { api } from "../../../shared/api/apiClient";


export const authService = {
    login: (user, credentials) => api.post('/auth/log-in', user, credentials),
    register: (userData) => api.post('/auth/sign-up', userData),
}