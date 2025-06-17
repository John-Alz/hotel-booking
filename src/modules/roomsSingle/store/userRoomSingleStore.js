import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useRoomSingleStore = create((set, get) => ({

    roomsSingle: [],
    roomSingleSelected: null,

    fetchRoomsSingle: async (page, roomType) => {
        const data = await api.get(`/api/v1/rooms?page=${page}&size=5&orderAsc=true&roomTypeId=${roomType}`)
        if (data) set({ roomsSingle: data })
    },

    fetchRoomSingle: async (id) => {
        const data = await api.get(`/api/v1/rooms/${id}`)
        if (data) set({ roomSingleSelected: data })
    }

}));

export default useRoomSingleStore;