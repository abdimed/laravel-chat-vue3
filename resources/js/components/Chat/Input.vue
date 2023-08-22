<template>

    <div class="flex space-x-5 py-2">
        <input v-model="message" placeholder="Type your message..."
            class="w-full p-2 focus:outline-none border rounded-full bg-gray-200 h-fit" />
        <button @click="sendMessage">Send</button>
    </div>
</template>

<script setup>
const props = defineProps({
    conversationId: String,
});
import { ref } from 'vue';
const message = ref("");

const sendMessage = async () => {
    await axios.post('/api/messages', {
        conversation_id: props.conversationId,
        body: message.value,
    });
    message.value = '';
}
</script>
