<template>
    <div>
        <input v-model="message" placeholder="Type your message..." />
        <button @click="sendMessage">Send</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            message: ''
        };
    },
    methods: {
        async sendMessage() {
            try {
                const response = await axios.post('/api/messages', {
                    conversation_id: '1',
                    body: this.message,
                });
                this.message = '';

                console.log('Message sent:', response.data);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },

    }
};
</script>
