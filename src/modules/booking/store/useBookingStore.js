import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useBookingStore = create((set, get) => ({
    bookings: [],
    booking: null,
    roomAssigment: null,

    fetchBookings: async () => {
        const data = await api.get("/api/v1/booking?page=0&size=20");
        if (data) set({ bookings: data })
    },

    fetchBooking: async (id) => {
        const data = await api.get(`/api/v1/booking/${id}`);
        if (data) set({ booking: data })
    },

    fetchRoomAssignment: async (bookingId) => {
        const data = await api.get(`/api/v1/room_assigment/${bookingId}`)
        if (data) set({ roomAssigment: data })
    }

}));

export default useBookingStore;