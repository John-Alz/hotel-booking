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
    userSelected: null,

    fetchUsers: async (page, filters) => {
        console.log(filters);

        const data = await api.get(`/api/v1/users?page=${page}&size=10&orderAsc=true&email=${filters.email}&role=${filters.role}`)
        if (data) set({ users: data })
    },

    fetchUser: async (id) => {
        const data = await api.get(`/api/v1/users/${id}`);
        if (data) set({ userSelected: data })
    }

}));

export default useUsersStore;