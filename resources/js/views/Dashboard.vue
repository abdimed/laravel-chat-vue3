<template>
    <div class="flex">
        <aside class="w-1/6 min-h-screen bg-blue-500 text-white flex flex-col p-4 font-semibold gap-4">
            <div>
                <h1>List of Users</h1>
                <ul>
                    <li v-for="user in users" :key="user.id">{{ user.email }}</li>
                </ul>
            </div>
        </aside>
        <main class="w-5/6 h-full">

        </main>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);

const getUsers = async () => {
    try {
        const response = await axios.get('/api/users');
        console.log('API Response:', response.data);
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

onMounted(getUsers);
</script>
