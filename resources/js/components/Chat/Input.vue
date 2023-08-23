<template>
    <form @submit.prevent="sendMessage" class="flex space-x-5 py-2">
        <textarea v-model="message" placeholder="Type your message..."
            class="w-full p-2 focus:outline-none border border-darkgray rounded-lg bg-gray-200 h-fit dark:bg-iblack/50 resize-none">
    </textarea>
        <button type="submit">Send</button>
    </form>
</template>

<script setup>
const props = defineProps({
    conversationId: String,
});
import { ref } from "vue";
const message = ref("");

const sendMessage = async () => {
    await axios.post("/api/messages", {
        conversation_id: props.conversationId,
        body: message.value,
    });
    message.value = "";
};
</script>
