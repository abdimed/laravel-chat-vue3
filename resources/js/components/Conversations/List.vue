<template>
    <div>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
      <ul>
        <li v-for="conversation in conversations" :key="conversation.id">
          <router-link :to="`/messages/${conversation.id}`" class="block py-5 hover:animate-pulse px-4">
            {{ conversation.topic }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>

  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";

  const users = ref([]);
  const conversations = ref([]);

  const getUsers = async () => {
    const response = await axios.get('/api/users');
    users.value = response.data;
  }

  const getConversations = async () => {
    try {
      const response = await axios.get("/api/conversations");
      conversations.value = response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  onMounted(() => {
    getUsers();
    getConversations();
  });
  </script>
