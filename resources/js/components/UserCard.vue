<template>
    <div class="flex flex-col items-stretch">

        <!-- <button @click="show = !show" class="lg:invisible">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button> -->

        <div class="flex-auto flex justify-between">

            <div class="flex items-center gap-x-3" v-if="authUser">
                <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(
                    authUser.name
                )}`" alt="{{ authUser.name}}" />

                <span class="capitalize">{{ authUser.name }}</span>
            </div>

            <button @click="showUserMenu = !showUserMenu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>

            </button>

        </div>

        <div class="px-2 py-3 z-50 flex flex-col" v-if="showUserMenu">
            <button @click="performLogout" v-if="isAuthenticated">Logout</button>
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
