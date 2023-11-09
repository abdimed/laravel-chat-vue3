<template>
    <div class="flex items-end gap-x-2" v-if="authUser" :dir="authUser.id === message.user.id ? 'rtl' : 'ltr'">
        <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(
            message.user.name
        )}`" alt="{{ message.user.id}}" />

        <div v-if="authUser" class="rounded-lg p-2 max-w-lg" :class="
            authUser.id === message.user.id
                ? 'bg-success text-white'
                : 'bg-warning dark:bg-violet-500'">

            <div class="break-all">{{ message.body }}</div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
    authUser: Object,
});
</script>
