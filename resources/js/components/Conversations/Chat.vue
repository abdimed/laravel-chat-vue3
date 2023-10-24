<template>
    <h2 class="w-full block mx-4 p-2">
        {{ topic }}
    </h2>

    <div
        class="flex-1 overflow-y-auto p-2 border border-darkgray rounded-xl m-4 flex flex-col"
    >
        <ul
            class="h-full flex flex-col gap-10 overflow-y-scroll px-2 py-10"
            ref="messageList"
            @scroll="loadMoreMessages"
        >
            <li v-for="message in messages" :key="message.id">
                <Message :message="message" :authUser="authUser" />
            </li>
        </ul>

        <chat-input :conversationId="route.params.conversationId"></chat-input>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import Message from "../Chat/Message.vue";
import ChatInput from "../Chat/Input.vue";
import api from "@/api";
import { useAuthUser } from "@/composables/useAuthUser";

const route = useRoute();
const messages = ref([]);
const topic = ref("");
const messageList = ref(null);
const currentPage = ref(1);

const { authUser, getAuthUser } = useAuthUser();

const getMessages = async () => {
    try {
        const response = await api.get(
            `/conversations/${route.params.conversationId}`
        );
        messages.value = response.data.messages.data.slice().reverse();
        topic.value = response.data.topic;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

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
    getAuthUser();
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
