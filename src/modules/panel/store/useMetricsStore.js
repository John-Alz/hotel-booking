import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";


const useMetricsStore = create((set, get) => ({

    //http://localhost:8080/api/v1/metrics
    metrics: null,

    fetchMetrics: async () => {
        const data = await api.get("/api/v1/metrics");
        if (data) set({ metrics: data });
    }

}));

export default useMetricsStore;