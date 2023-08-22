<template>
    <div>
        <ul>
            <li v-for="conversation in conversations" :key="conversation.id">
                <router-link :to="`/messages/${conversation.id}`" class="block py-5 border-b border-darkgray px-4">{{
                    conversation.topic
                }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import axios from 'axios';

export default {
    setup() {
        const conversations = ref([]);

        const getConversations = async () => {
            try {
                const response = await axios.get("/api/conversations");
                conversations.value = response.data;
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        onMounted(getConversations);

        return {
            conversations,
        };
    },
};
</script>
