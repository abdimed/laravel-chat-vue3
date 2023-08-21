<template>
    <h2 class="w-full block mx-4 p-2">
        {{ topic }}
    </h2>
    <div
        class="flex-1 overflow-y-scroll p-2 border border-black rounded-xl m-4 flex flex-col"
    >
        <ul
            v-if="messages.length > 0"
            class="flex flex-col gap-10 h-full overflow-y-scroll px-2 py-10"
        >
            <li v-for="message in messages" :key="message.id">
                <Message :message="message" />
            </li>
        </ul>
        <div v-else class="flex-1 bg-lightgray animate-pulse">

        </div>
        <div class="flex space-x-5 py-2">
            <input
                v-model="newMessage"
                placeholder="Type your message..."
                class="w-full p-2 focus:outline-none border rounded-full bg-gray-200 h-fit"
            />
            <button @click="sendNewMessage">Send</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import Message from "./Message.vue";
import axios from "axios";

const route = useRoute();
const messages = ref([]);
const newMessage = ref("");
const topic = ref("");

const getMessages = async () => {
    try {
        messages.value = [];
        const response = await axios.get(
            `/api/conversations/${route.params.conversationId}`
        );
        messages.value = response.data.messages;
        topic.value = response.data.topic;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

const sendNewMessage = async () => {
    const response = await axios.post("/api/messages", {
        conversation_id: route.params.conversationId,
        body: newMessage.value,
    });

    newMessage.value = "";
};

const listen = async () => {
    await Echo.private(`messages`).listen("NewMessage", (message) => {
        messages.value.push(message);
        console.log(message);
    });
};

onMounted(() => {
    listen();
    getMessages();
    watch(
        () => route.params.conversationId,
        () => {
            getMessages();
        }
    );
});
</script>
