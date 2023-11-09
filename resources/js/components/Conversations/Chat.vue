<template>
    <div class="flex flex-col flex-1">

        <h2 class="w-full px-4 py-2">
            {{ topic }}
        </h2>

        <div class="p-2 border dark:border-slate-700 rounded-xl m-4 flex flex-col flex-1">
            <ul class="h-0 flex flex-col flex-auto gap-10 overflow-y-scroll px-2 py-10" ref="messageList" @scroll="loadMoreMessages">
                <li v-for="message in messages" :key="message.id">
                    <Message :message="message" :authUser="authUser" />
                </li>
            </ul>

            <chat-input :conversationId="route.params.conversationId"></chat-input>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted, onBeforeMount } from "vue";
import Message from "../Chat/Message.vue";
import ChatInput from "../Chat/Input.vue";
import api from "@/api";
import { useConversations } from "../../composables/conversations";

import { useAuthStore } from "../../store/auth";


const authStore = useAuthStore();

const authUser = authStore.user;

const { topic, messages, getMessages } = useConversations();

const messageList = ref(null);
const currentPage = ref(1);
const route = useRoute();

//Improve this logic
async function loadMoreMessages() {
    if (messageList.value.scrollTop === 0) {
        currentPage.value++;
        try {
            const response = await api.get(
                `/conversations/${route.params.conversationId}?page=${currentPage.value}`
            );
            const newMessages = response.data.messages.data.slice().reverse();
            messages.value = [...newMessages, ...messages.value];
        } catch (error) {
            console.error("Error fetching more messages:", error);
        }
    }
}

async function listen() {
    await Echo.private(`conversation.${route.params.conversationId}`).listen(
        "NewMessage",
        (message) => {
            messages.value.push(message);
            console.log(message);
        }
    );
}

onMounted(() => {
    getMessages();
    listen();
    scrollToBottom();
});

const scrollToBottom = () => {
    messageList.value.scrollTop = messageList.value.scrollHeight;
    console.log(messageList.value.scrollTop);
    console.log(messageList.value.scrollHeight);
};

watch(
    () => route.params,
    (newParams, oldParams) => {
        if (newParams.conversationId !== oldParams.conversationId) {
            Echo.leave(`conversation.${oldParams.conversationId}`);
            listen();
            getMessages();
        }
    }
);
</script>
