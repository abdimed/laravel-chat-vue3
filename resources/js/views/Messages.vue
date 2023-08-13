<template>
    <div class="flex">

        <aside class="w-1/6 min-h-screen bg-blue-500 text-white flex flex-col p-4 font-semibold gap-4">

            <conversations-list></conversations-list>

        </aside>

        <main class="w-5/6 h-screen">
            <router-view />
        </main>

    </div>

</template>

<script setup>

import ConversationsList from './components/Conversations/List.vue'

</script>
