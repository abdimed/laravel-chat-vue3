<template>
    <div class="flex justify-between border-b dark:border-slate-700 py-2 px-4">
        <button @click="show = !show" class="lg:invisible">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>
        <div class="relative">
            <div class="flex items-center space-x-3" @click="showUserMenu = !showUserMenu" v-if="authUser">
                <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(
                    authUser.name
                )}`" alt="{{ authUser.name}}" />

            </div>
            <div class="absolute bg-white dark:bg-slate-800 shadow-xl right-0 px-2 py-3 z-50" v-if="showUserMenu">
                <span>{{ authUser.name }}</span>
                <button @click="performLogout" v-if="isAuthenticated">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../store/auth";

const store = useAuthStore();
const showUserMenu = ref(false);

const isAuthenticated = computed(() => store.isAuthenticated);

const authUser = computed(() => store.authUser);

const performLogout = async () => {
    await store.logout();
};


</script>
