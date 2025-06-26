import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useRoomSingleStore = create((set, get) => ({

    roomsSingle: [],
    roomSingleSelected: null,

    fetchRoomsSingle: async (page, size, roomType, status = "") => {
        const data = await api.get(`/api/v1/rooms?page=${page}&size=${size}&orderAsc=true&roomTypeId=${roomType}&status=${status}`)
        console.log(data);

        if (data) set({ roomsSingle: data })
    },

    fetchRoomSingle: async (id) => {
        const data = await api.get(`/api/v1/rooms/${id}`)
        if (data) set({ roomSingleSelected: data })
    }

}));

export default useRoomSingleStore;