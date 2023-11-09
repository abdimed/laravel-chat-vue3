import { createWebHistory, createRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

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
        component: Login,
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
    linkActiveClass: 'bg-primary dark:bg-slate-700',
    routes
});

// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();
//     const isAuthenticated = authStore.isAuthenticated;

//     if (to.meta.requiresAuth && !isAuthenticated) {
//         next('/login');
//     } else if (to.name === 'login' && isAuthenticated) {
//         next('/messages');
//     } else {
//         next();
//     }
// });

export default router;
