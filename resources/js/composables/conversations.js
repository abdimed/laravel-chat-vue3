
import { ref } from 'vue';

import api from '@/api';

import { useRoute } from "vue-router";

export function useConversations() {

    const selectedUsers = ref([]);
    const conversations = ref([]);
    const route = useRoute();
    const messages = ref([]);
    const topic = ref('');


    const createConversation = async () => {

        console.log(selectedUsers.value)

        try {
            await api.post('/conversations', {
                topic: topic.value,
                participants: selectedUsers.value,
            });
        } catch (error) {
            console.error('Error creating conversation', error);
        }

    }

    const getConversations = async () => {
        const response = await api.get('/conversations');
        conversations.value = response.data;
    };

    const getMessages = async () => {
        const response = await api.get(
            `/conversations/${route.params.conversationId}`
        );
        messages.value = response.data.messages.data.slice().reverse();
        topic.value = response.data.topic;
    }

    return {
        topic,
        conversations,
        messages,
        getMessages,
        getConversations,
        createConversation,
    };
}

