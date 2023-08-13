<template>
    <div class="bg-gray-200 h-full w-full">
        <span class="bg-blue-500 w-full block text-white">
            {{ $route.params.conversationId }}
        </span>

        <ul class="flex flex-col gap-10 h-5/6 overflow-y-scroll py-2">
            <li v-for="message in  messages " :key="message.id">

                <message :message="message"></message>

            </li>
        </ul>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import Message from './Message.vue';

export default {
    components: {
        Message
    },
    data() {
        return {
            route: useRoute(),
            messages: []
        };
    },
    created() {
        this.getMessages();
    },
    methods: {
        async getMessages() {
            try {
                const response = await axios.get('/api/conversations/' + this.route.params.conversationId);
                this.messages = response.data.messages;
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
    },
    watch: {
        '$route.params.conversationId': 'getMessages'
    }
};
</script>
