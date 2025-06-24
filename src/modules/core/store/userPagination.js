import { create } from "zustand";


const usePagination = create((set, get) => ({
    page: 0,
    setPage: (page) => set({ page }),
}));

export default usePagination;