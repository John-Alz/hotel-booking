import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useRoomStore = create((set) => ({
    rooms: [],
    roomSelected: null,
    filters: {},
    setFilter: (payload) => {
        set({ filters: payload })
    },

    fetchRooms: async () => {
        const data = await api.get('/api/v1/rooms/types?page=0&size=10')
        if (data) set({ rooms: data })
    },

    fetchRoom: async (id) => {
        const data = await api.get(`/api/v1/rooms/types/${id}`)
        if (data) set({ roomSelected: data })
    }
}))

export default useRoomStore;