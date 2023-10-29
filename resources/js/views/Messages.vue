<template>
        <h2>User Name: {{ user}}</h2>
    <div
        class="flex justify-between border-b dark:border-slate-700 py-2 px-2 w-full"
    >
        <button @click="show = !show" class="lg:invisible">
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
        <div>
            <span v-if="authUser"> {{ authUser.name }}</span>

            <button @click="performLogout">logout</button>
        </div>
    </div>

    <div class="flex relative h-full w-full">
        <transition>
            <aside
                v-if="show"
                class="w-4/5 bg-white lg:w-1/6 lg:h-full flex overflow-y-auto flex-col font-semibold gap-4 border-r dark:border-slate-700 absolute top-0 lg:relative z-50"
            >
                <conversations-list></conversations-list>
            </aside>
        </transition>

        <main class="w-full">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import ConversationsList from "../components/Conversations/List.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useUsers } from "../composables/users";

const show = ref(true);
const store = useStore();
const router = useRouter();
const { authUser, getAuthUser } = useUsers();

const user = computed(() => store.state.auth.user); // Define a computed property

const performLogout = async () => {
    await store.dispatch("auth/logout");
};

onMounted(() => {
    getAuthUser();
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
