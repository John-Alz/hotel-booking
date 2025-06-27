import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const usePaymentStore = create((set, get) => ({

    payments: [],
    paymentSelected: null,
    paymentPreference: {},
    filtersPayments: {
        dateFromPayment: '',
        dateToPayment: '',
        priceMin: '',
        roomTypeId: '',
        status: ''
    },

    setFiltersPayments: (payload) => {
        set({ filtersPayments: payload })
    },

    clearFiltersPayments: () => {
        set({
            filtersPayments: {
                dateFromPayment: '',
                dateToPayment: '',
                priceMin: '',
                roomTypeId: '',
                status: ''
            }
        })
    },

    fetchPayments: async (page = 0, filters, search = "") => {
        const data = await api.get(`/api/v1/payments?page=${page}&size=20&orderAsc=true&numberBooking=${search}&dateFromPayment=${filters.dateFromPayment}&dateToPayment=${filters.dateToPayment}&priceMin=${filters.priceMin}&roomTypeId=${filters.roomTypeId}&status=${filters.status}`);
        if (data) set({ payments: data })
    },

    fetchPayment: async (id) => {
        const data = await api.get(`/api/v1/payments/${id}`);
        console.log(data);

        if (data) set({ paymentSelected: data })
    },

    postPayment: async (data) => {
        const response = await api.post("/api/v1/payments", data)
        console.log(response.data);
        if (response) set({ paymentPreference: response.data })

    }

}));

export default usePaymentStore;