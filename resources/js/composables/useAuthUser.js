import api from "@/api";
import { ref } from "vue";
export const authUser = ref(null);

export function useAuthUser() {
    const getAuthUser = async () => {
        try {
            const response = await api.get(`/user/current`);
            authUser.value = response.data;
        } catch (error) {
            console.error("Error fetching authenticated user:", error);
        }
    }

    return {
        authUser,
        getAuthUser,
    };
}
