<template>
    <div class="flex flex-col flex-auto border-2 dark:border-slateSteel rounded-tl-xl">

        <h2 class="w-full px-4 py-2">
            {{ topic }}
        </h2>

        <div class="py-2 px-4 rounded-xl m-4 flex flex-col flex-auto border border-red-500">
            <ul class="h-0 flex flex-col flex-auto gap-10 overflow-y-auto px-4" ref="messagesList"
                @scroll="loadMoreMessages">
                <li v-for="message in messages" :key="message.id">
                    <Message :message="message" :authUser="authUser" />
                </li>
                <li v-if="isTyping"> isTyping </li>
            </ul>
            <button @click="scrollToBottom">Scroll</button>
            <chat-input :conversationId="route.params.conversationId" @click="seen()"></chat-input>
        </div>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted, onBeforeMount, nextTick, onUpdated } from "vue";
import { useConversations } from "../../composables/conversations";
import { useAuthStore } from "../../store/auth";
import api from "@/api";
import Message from "../Chat/Message.vue";
import ChatInput from "../Chat/Input.vue";

const authStore = useAuthStore();

const authUser = authStore.user;

const { topic, messages, getMessages } = useConversations();

const messagesList = ref(null);
const currentPage = ref(1);
const route = useRoute();
const isTyping = ref(false);

//Improve this logic
async function loadMoreMessages() {

    if (messagesList.value.scrollTop === 0) {
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
        "MessageSent",
        (message) => {
            messages.value.push(message);
        }
    );

}

const scrollToBottom = async () => {
    messagesList.value.scrollTop = messagesList.value.scrollHeight;
};


async function listenForTyping() {
    await Echo.private(`conversation.${route.params.conversationId}`)
        .listenForWhisper('typing', (e) => {
            isTyping.value = true;
        });
    isTyping.value = false;
}

onBeforeMount(() => {

})

onMounted(() => {
    getMessages();
    listen();
    listenForTyping()
});

onUpdated(() => {
    scrollToBottom();
})

watch(
    () => route.params,
    (newParams, oldParams) => {
        if (newParams.conversationId !== oldParams.conversationId) {
            Echo.leave(`conversation.${oldParams.conversationId}`);
            listen();
            getMessages();
            // scrollToBottom();
        }
    }
);
</script>
