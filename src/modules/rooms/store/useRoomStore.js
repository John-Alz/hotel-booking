import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";
import { persist } from "zustand/middleware";


const useRoomStore = create(
    persist(
        (set, get) => ({
            rooms: [],
            roomSelected: null,
            filters: {},
            setFilter: (payload) => {
                set({ filters: payload })
            },
            clearFilters: () => {
                set({ filters: {} })
            },

            fetchRooms: async (filters2) => {
                console.log(filters2);

                const url = `/api/v1/rooms/types?page=0&size=10&roomName=${filters2?.type ?? ""}&amenityId=${filters2?.amenity ?? ""}&roomCapacity=${filters2?.capacity ?? ""}`;
                console.log("URL:", url);
                const data = await api.get(url)
                if (data) set({ rooms: data })
            },

            fetchRoom: async (id) => {
                const data = await api.get(`/api/v1/rooms/types/${id}`)
                if (data) set({ roomSelected: data })
            }
        }),
        {
            name: "filters-storage",
            partialize: (state) => ({ filters: state.filters })
        }
    )
)

export default useRoomStore;