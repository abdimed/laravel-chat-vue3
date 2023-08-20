<template>
    <div class="bg-gray-200 h-full w-full">
        <span class="bg-blue-500 w-full block text-white">
            {{ route.params.conversationId }}
        </span>

        <ul class="flex flex-col gap-10 h-5/6 overflow-y-scroll py-2">
            <li v-for="message in messages" :key="message.id">
                <Message :message="message" />
            </li>
        </ul>
        <hr />

        <div>
            <input v-model="newMessage" placeholder="Type your message..." />
            <button @click="sendNewMessage">Send</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import Message from "./Message.vue";

const route = useRoute();
const messages = ref([]);
const newMessage = ref("");

const getMessages = async () => {
    try {
        const response = await axios.get(
            `/api/conversations/${route.params.conversationId}`
        );
        messages.value = response.data.messages;
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
       console.log(message)
    });
};

watch(
    () => route.params.conversationId,
    () => {
        // listen();
        getMessages();
    }
);

onMounted(() => {
    listen();
    getMessages();
});
</script>
