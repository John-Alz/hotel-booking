import axios from "axios";



const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const api = {
    get: async (endpoint) => {
        console.log(endpoint);

        try {
            let response = await apiClient.get(endpoint);
            return response.data;
        } catch (error) {
            console.log(`Error en el get de la app: ${error}`);
            throw new Error;
        }
    },
    post: async (endpoint, data) => {
        try {
            let response = await apiClient.post(endpoint, data);
            return response;
        } catch (error) {
            console.log(`Error en el post de la app: ${error}`);
            throw new Error;
        }
    },

}