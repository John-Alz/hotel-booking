import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const usePaymentStore = create((set, get) => ({

    payments: [],
    paymentPreference: {},

    postPayment: async (data) => {
        const response = await api.post("/api/v1/payments", data)
        console.log(response.data);
        if (response) set({ paymentPreference: response.data })

    }

}));

export default usePaymentStore;