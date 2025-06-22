import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useUsersStore = create((set, get) => ({

    filtersUsers: {
        email: '',
        role: '',
    },
    setFiltersUsers: (payload) => {
        set({ filtersUsers: payload })
    },
    users: [],

    fetchUsers: async (filters) => {
        console.log(filters);

        const data = await api.get(`/api/v1/users?page=0&size=20&orderAsc=true&email=${filters.email}&role=${filters.role}`)
        if (data) set({ users: data })
    }

}));

export default useUsersStore;