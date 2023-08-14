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
        <hr>

        <div>
            <input v-model="message" placeholder="Type your message..." />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import axios from 'axios';
import Message from './Message.vue';
import MessageInput from './Input.vue';
// import Echo from 'laravel-echo';

export default {
    components: {
        Message,
        MessageInput,
    },
    data() {
        return {
            route: useRoute(),
            messages: [],
            message: ''
        };
    },
    mounted() {
        this.listen();
        this.getMessages();
    },
    created() {

    },
    methods: {
        async getMessages() {
            try {
                const response = await axios.get('/api/conversations/' + this.route.params.conversationId);
                this.messages = response.data.messages;
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        },
        async sendMessage() {
            try {
                const response = await axios.post('/api/messages', {
                    conversation_id: '1',
                    body: this.message,
                });
                this.message = '';
                // console.log(Echo.channel('converstions')
                //     .listen('NewMessage', () => {
                //         console.log('zeb');
                //         // this.messages.unshift(message);
                //     })
                // )
                Echo.private('converstions.1')
                    .listen('NewMessage', () => {
                        console.log('zeb');
                        // this.messages.unshift(message);
                    })

                console.log('Message sent:', response.data);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },
        listen() {
            try {
                Echo.channel('converstions')
                    .listen('NewMessage', () => {
                        console.log('zeb');
                        // this.messages.unshift(message);
                    })
            } catch (error) {
                console.error('Error sending message:', error);
            }

        }
    },
    watch: {
        '$route.params.conversationId': 'getMessages'
    },


};
</script>
