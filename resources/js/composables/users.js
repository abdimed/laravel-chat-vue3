import { ref, computed } from "vue";
import { useStore } from 'vuex';
import api from '@/api';

export const isAuthenticated = computed(() => {
    const store = useStore();
    return store.getters['auth/isAuthenticated'];
});

export function useUsers() {

    const users = ref([]);
    const authUser = ref(null);

    const getUsers = async () => {
        if (isAuthenticated.value) {
            try {
                const response = await api.get('/users');
                users.value = response.data;
            } catch (error) {
                console.error('Error getting users')
            }
        }
    };

    const getAuthUser = async () => {
        try {
            const response = await api.get(`/user`);
            authUser.value = response.data.id;
        } catch (error) {
            console.error("Error fetching authenticated user:", error);
        }
    }

    return {
        users,
        authUser,
        isAuthenticated,
        getUsers,
        getAuthUser,
    }

}
