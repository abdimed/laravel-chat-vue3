<template>
    <div>
        <ul>
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
        <ul>
            <li v-for="conversation in conversations" :key="conversation.id">
                <router-link
                    :to="`/messages/${conversation.id}`"
                    class="block py-5 hover:animate-pulse px-4"
                >
                    {{ conversation.topic }}
                </router-link>
            </li>
        </ul>
    </div>
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
    console.log(isAuthenticated.value);
    if (isAuthenticated.value) {
        try {
            const response = await api.get('/conversations');
            conversations.value = response.data;
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    }
};

onMounted(() => {
    getUsers();
    getConversations();
});
</script>
