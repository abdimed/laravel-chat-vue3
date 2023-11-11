<template>
    <form @submit.prevent="sendMessage" class="flex gap-x-5 pt-4">
        <input v-model="message" ref="input" placeholder="Type your message..."
            class="w-full p-2 focus:outline-none border dark:border-none rounded-lg bg-gray-200 dark:bg-slateSteel h-fit resize-none" />

        <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>

        </button>
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
