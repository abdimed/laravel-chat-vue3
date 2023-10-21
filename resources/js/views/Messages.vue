<template>
    <nav class="flex flex-1 justify-between">
        <div></div>
        <button @click="performLogout">logout</button>
    </nav>
    <div class="flex relative">
        <transition>
            <aside
                v-if="show"
                class="w-4/5 bg-white lg:w-1/6 min-h-screen flex flex-col font-semibold gap-4 border-r border-darkgray absolute lg:relative z-50"
            >
                <conversations-list></conversations-list>
            </aside>
        </transition>

        <button @click="show = !show" class="">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
            </svg>
        </button>

        <div class="w-full h-screen flex flex-col">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import ConversationsList from "../components/Conversations/List.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const show = ref();
const store = useStore();
const router = useRouter();

const performLogout = async () => {
    await store.dispatch("auth/logout");
    // router.push({ name: "login" }); // Redirect to the login page after logging out
};

onMounted(() => {
    show.value = true;
});
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
