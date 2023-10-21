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
        meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('authToken')) {
        next('/login');
    } else {
        next();
    }
});

export default router;
