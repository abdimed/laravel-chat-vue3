<template>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
    <ul class="px-2">
        <li v-for="conversation in conversations" :key="conversation.id">
            <router-link :to="`/messages/${conversation.id}`" class="block py-5 hover:animate-pulse px-4 rounded-xl">
                {{ conversation.topic }}
            </router-link>
        </li>
    </ul>
</template>

<script setup>

import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import api from '@/api';

const users = ref([]);

const conversations = ref([]);

const store = useStore();

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);

const getUsers = async () => {
    const response = await axios.get("/api/users");
    users.value = response.data;
};

const getConversations = async () => {
    if (isAuthenticated.value) {
        try {
            const response = await api.get('/conversations');
            conversations.value = response.data;
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    }
};

const createConversation = async () => {
    const response = await api.post('/conversations');
}

onMounted(() => {
    getUsers();
    getConversations();
});


</script>
