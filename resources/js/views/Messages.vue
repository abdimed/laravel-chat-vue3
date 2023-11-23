<template>
    <div class="flex grow relative bg-lightSilver dark:bg-midnight">

        <transition class="h-full overflow-y-auto">
            <aside v-if="show"
                class="w-1/6 lg:h-full flex overflow-y-auto flex-col font-semibold gap-4">
                <ConversationsList />
            </aside>
        </transition>

        <main class="grow flex flex-col bg-white dark:bg-charcoalNight mt-4 rounded-lg">
            <router-view />
        </main>

    </div>
</template>

<script setup>
import ConversationsList from "../components/Conversations/List.vue";

import { ref } from "vue";

const show = ref(true);

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
