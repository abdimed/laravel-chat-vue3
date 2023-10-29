<template>
    <form @submit.prevent="sendMessage" class="flex space-x-5 py-2">
        <input
            v-model="message"
            ref="input"
            placeholder="Type your message..."
            class="w-full p-2 focus:outline-none border dark:border-none rounded-lg bg-gray-200 dark:bg-slate-800 h-fit dark:bg-iblack/50 resize-none"
        />

        <button type="submit">Send</button>
    </form>
</template>

<script setup>
import api from "@/api";
import { ref, onMounted } from "vue";

const message = ref("");

const input = ref(null);

const props = defineProps({
    conversationId: String,
});

const sendMessage = async () => {
    await api.post("/messages", {
        conversation_id: props.conversationId,
        body: message.value,
    });
    message.value = "";
};

onMounted(() => {
    input.value.focus();
});
</script>
