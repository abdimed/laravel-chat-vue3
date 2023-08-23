<template>
    <div class="flex">

        <aside class="w-1/6 min-h-screen flex flex-col font-semibold gap-4 border-r">

            <conversations-list></conversations-list>

        </aside>

        <main class="w-5/6 h-screen flex flex-col">
            <router-view />
        </main>

    </div>

</template>

<script setup>

import ConversationsList from '../components/Conversations/List.vue'

</script>
