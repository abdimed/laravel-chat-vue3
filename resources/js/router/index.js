import { createWebHistory, createRouter } from "vue-router";

import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Messages from "../views/Messages.vue";
import Conversation from "../components/Conversations/Chat.vue";
import axios from "axios";

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

    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')
    }



];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'bg-primary dark:bg-darkgray',
    routes
});

export default router;
