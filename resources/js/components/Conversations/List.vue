<template>
    <div class="bg-white dark:bg-slate-900 h-full">
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
            <li v-for="conversation in conversations" :key="conversation.id">
                <router-link :to="`/messages/${conversation.id}`" class="block py-5 hover:animate-pulse px-4 rounded-xl">
                    {{ conversation.topic }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useConversations } from "@/composables/conversations";
import { useUsers } from "@/composables/users";

const { users, getUsers } = useUsers();

const { conversations, getConversations, createConversation, topic } = useConversations();

const show = ref(false);

onMounted(() => {
    getUsers();
    getConversations();
});

</script>
