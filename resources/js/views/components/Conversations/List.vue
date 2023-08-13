<template>
    <div>
        <ul>
            <li v-for="conversation in conversations" :key="conversation.id">

                <router-link :to="`/messages/${conversation.id}`">{{ conversation.topic }}</router-link>

            </li>
        </ul>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            users: [],
            conversations: []
        };
    },
    methods: {
        async getUsers() {
            try {
                const response = await axios.get('/api/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async getConversations() {
            try {
                const response = await axios.get('/api/conversations');
                this.conversations = response.data;
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        }
    },
    created() {
        this.getUsers();
        this.getConversations();
    }
};
</script>
