
import { ref } from 'vue';
import api from '@/api';
import { useUsers } from "@/composables/users";
import { useRoute } from "vue-router";

export function useConversations() {

    const { isAuthenticated } = useUsers();
    const selectedUsers = ref([]);
    const conversations = ref([]);
    const route = useRoute();
    const messages = ref([]);
    const topic = ref('');


    const createConversation = async () => {
        if (isAuthenticated.value) {
            console.log(selectedUsers.value)
            try {
                const response = await api.post('/conversations', {
                    topic: topic.value,
                    participants: selectedUsers.value,
                });
            } catch (error) {
                console.error('Error creating conversation', error);
            }
            getConversations();
        }
    }

    const getConversations = async () => {
        if (isAuthenticated.value) {
            try {
                const response = await api.get('/conversations');
                conversations.value = response.data;
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        }
    };

    const getMessages = async () => {
        if (isAuthenticated) {
            try {
                const response = await api.get(
                    `/conversations/${route.params.conversationId}`
                );
                messages.value = response.data.messages.data.slice().reverse();
                topic.value = response.data.topic;
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
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

