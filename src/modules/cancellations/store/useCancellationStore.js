import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useCancellationStore = create((set, get) => ({
    cancellations: [],
    cancellationSelected: null,
    filtersCancellations: {
        bookingNumber: '',
        dateFromCancellation: '',
        dateToCancellation: '',
        priceMin: '',
        roomTypeId: ''
    },
    setFiltersCancellations: (payload) => {
        set({ filtersCancellations: payload })
    },
    clearFiltersCancellations: () => {
        set({
            filtersCancellations: {
                dateFromCancellation: '',
                dateToCancellation: '',
                priceMin: '',
                roomTypeId: ''
            },
        })
    },
    // clearFilterCancellations: (filter) => {
    //     set((state) => ({
    //         set: { ...state.filtersCancellations, [filter]: '' }
    //     }))
    // },



    fetchCancellations: async (page, filters, search = "") => {
        console.log(filters);

        const data = await api.get(`/api/v1/cancellations?page=${page}&size=10&orderAsc=true&dateFromCancellation=${filters.dateFromCancellation}&dateToCancellation=${filters.dateToCancellation}&priceMin=${filters.priceMin}&roomTypeId=${filters.roomTypeId}&numberBooking=${search}`)
        if (data) set({ cancellations: data })
    },

    fetchCancellation: async (id) => {
        const data = await api.get(`/api/v1/cancellations/${id}`)
        if (data) set({ cancellationSelected: data })
    }

}));

export default useCancellationStore;