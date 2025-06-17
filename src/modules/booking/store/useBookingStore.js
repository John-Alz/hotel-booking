import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useBookingStore = create((set, get) => ({
    bookings: [],
    booking: null,

    fetchBookings: async () => {
        const data = await api.get("/api/v1/booking?page=0&size=10");
        if (data) set({ bookings: data })
    },

    fetchBooking: async (id) => {
        const data = await api.get(`/api/v1/booking/${id}`);
        if (data) set({ booking: data })
    },

}));

export default useBookingStore;