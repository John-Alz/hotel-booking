import axios from "axios";
import { toast } from "react-toastify";



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

    put: async (endpoint, data) => {
        console.log(endpoint, data);
        try {
            console.log('PUT endpoint:', endpoint, data);  // Agrega esto
            let response = await apiClient.put(endpoint, data);
            return response;
        } catch (error) {
            console.log(`Error en el PUT de la app:`, error.response || error.message || error);
            throw new Error;
        }
    },

    delete: async (endPonit) => {
        console.log("SE ELIMINO");
        console.log(endPonit);
        try {
            let response = await apiClient.delete(endPonit);
            return response;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return error.response;
            }
            console.log(`Error en la peticon DELETE: ${error}`);
            throw error;
        }
    }


}