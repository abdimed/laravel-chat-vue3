<template>
    <div class="bg-gray-200 h-full w-full">
        <span class="bg-blue-500 w-full block text-white">
            {{ conversationId }}
        </span>

        <ul class="flex flex-col gap-10 h-5/6 overflow-y-scroll py-2">
            <li v-for="message in messages" :key="message.id">
                <Message :message="message" />
            </li>
        </ul>
        <hr>

        <div>
            <input v-model="newMessage" placeholder="Type your message..." />
            <button @click="sendNewMessage">Send</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
// import axios from 'axios';
import Message from './Message.vue';


const route = useRoute();
const conversationId = ref('');
const messages = ref([]);
const newMessage = ref('');

const getMessages = async () => {
    try {
        const response = await axios.get(`/api/conversations/${conversationId.value}`);
        messages.value = response.data.messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};

const sendNewMessage = async () => {
    try {
        const response = await axios.post('/api/messages', {
            conversation_id: conversationId.value,
            body: newMessage.value,
        });
        newMessage.value = '';
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

const listen = () => {
    try {
        Echo.private('conversations.${conversationId.value}')
            .listen('NewMessage', (message) => {
                console.log(message);
                // messages.unshift(message);
            });
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

watch(() => route.params.conversationId, () => {
    conversationId.value = route.params.conversationId;
    getMessages();
});

onMounted(() => {
    listen();
    conversationId.value = route.params.conversationId;
    getMessages();
});
</script>
