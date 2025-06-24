import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";


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

            fetchRooms: async (page, size = 4, filters2) => {
                console.log("FILTERS: " + JSON.stringify(filters2));
                let today = dayjs().add(1, 'day').format('YYYY-MM-DD');
                let after = dayjs().add(2, 'day').format('YYYY-MM-DD');
                const url = `/api/v1/rooms/types?page=${page}&size=${size}&checkIn=${filters2?.checkin ?? today}&checkOut=${filters2?.checkout ?? after}&roomName=${filters2?.type ?? ""}&amenityId=${filters2?.amenity ?? ""}&roomCapacity=${filters2?.capacity ?? ""}`;
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