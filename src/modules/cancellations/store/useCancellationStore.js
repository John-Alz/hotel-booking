import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useCancellationStore = create((set, get) => ({
    cancellations: [],
    cancellationSelected: null,

    fetchCancellations: async () => {
        const data = await api.get(`/api/v1/cancellations?page=0&size=10&orderAsc=true`)
        if (data) set({ cancellations: data })
    },

    fetchCancellation: async (id) => {
        const data = await api.get(`/api/v1/cancellations/${id}`)
        if (data) set({ cancellationSelected: data })
    }

}));

export default useCancellationStore;