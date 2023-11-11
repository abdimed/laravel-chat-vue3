import { ref } from "vue";
import api from '@/api';


export function useUsers() {

    const users = ref([]);

    const getUsers = async () => {

        try {
            const response = await api.get('/users');
            users.value = response.data;
        } catch (error) {
            console.error('Error getting users');
        }

    };

    return {
        users,
        getUsers,
    };
}
