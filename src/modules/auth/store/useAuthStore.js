import { create } from "zustand";
import { api } from "../../../shared/api/apiClient";
import { persist } from "zustand/middleware";


const useAuthStore = create(
    persist(
        (set, get) => ({
            profile: null,

            fetchProfile: async () => {
                const data = await api.get("/auth/profile", {
                    withCredentials: true,
                })
                if (data) set({ profile: data })
            },

            logOut: () => {
                set({ profile: null })
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ profile: state.profile })
        }
    )
);

export default useAuthStore;