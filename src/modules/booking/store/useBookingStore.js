import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useBookingStore = create((set, get) => ({
    bookings: [],
    booking: null,
    roomAssigment: null,
    filtersBooking: {
        checkInDate: '',
        checkOutDate: '',
        priceMin: '',
        roomTypeId: '',
        status: '',
    },

    setFiltersBooking: (payload) => {
        set({ filtersBooking: payload })
    },

    clearFiltersBooking: () => {
        set({
            filtersBooking: {
                checkInDate: '',
                checkOutDate: '',
                priceMin: '',
                roomTypeId: '',
                status: '',
            },
        })
    },

    fetchBookings: async (page, filters, numberBooking = '') => {
        const data = await api.get(`/api/v1/booking?page=${page}&size=10&checkInDate=${filters.checkInDate}&checkOutDate=${filters.checkOutDate}&priceMin=${filters.priceMin}&roomTypeId=${filters.roomTypeId}&status=${filters.status}&numberBooking=${numberBooking}`);
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