import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Messages from "../views/Messages.vue";
import Conversation from "../components/Conversations/Chat.vue";


const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: "login",
        component: Login
    },
    {
        path: "/messages",
        name: "messages",
        component: Messages,
        children: [
            {
                path: ':conversationId',
                name: "conversation",
                component: Conversation,

            }
        ]
    },



];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'bg-lightgray',
    routes
});

export default router;
