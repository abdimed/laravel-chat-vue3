<template>
    <div class="bg-lightSilver dark:bg-midnight h-full py-6 px-6 flex flex-col space-y-10">

        <user-card />

        <button @click="show = true">new conversation</button>

        <form @submit.prevent="createConversation" v-if="show">
            <div class="bg-green-500 py-2 px-2 flex flex-col space-y-5">
                <select v-model="selectedUsers" multiple>
                    <option v-for="user in users" :key="user.id">
                        {{ user.name }}
                    </option>
                </select>
                <input type="text" v-model="topic" />
                <button type="submit">Create</button>
            </div>
        </form>

        <ul class="px-2">
            <li v-for="conversation in conversations" :key="conversation.id"
                @click="clearNewMessageConversationId(conversation.id)">
                <router-link :to="`/messages/${conversation.id}`" class="block py-5 hover:animate-pulse px-4 rounded-xl">
                    {{ conversation.topic }}
                    <div v-if="showNotificationDot(conversation.id)" class="bg-red-500 text-white w-2 h-2 rounded-full">
                    </div>
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useConversations } from "@/composables/conversations";
import { useUsers } from "@/composables/users";
import { useRoute } from "vue-router";
import { useAuthStore } from "../../store/auth";
import UserCard from "../UserCard.vue";

const route = useRoute();

const authStore = useAuthStore();

const { users, getUsers } = useUsers();

const { conversations, getConversations, createConversation, topic } = useConversations();

const show = ref(false);

const newMessageConversationId = ref(null);

async function listenToNewMessageNotification() {
    await Echo.private(`App.Models.User.${authStore.user.id}`).notification((notification) => {
        newMessageConversationId.value = notification.conversation;
    });
}

const clearNewMessageConversationId = (conversationId) => {
    newMessageConversationId.value = null;
};

const showNotificationDot = (conversationId) => {
    return newMessageConversationId.value === conversationId && newMessageConversationId.value !== parseFloat(route.params.conversationId);
}

onMounted(() => {
    listenToNewMessageNotification();
    getUsers();
    getConversations();
});

</script>
