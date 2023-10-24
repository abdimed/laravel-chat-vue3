<template>
    <div
        class="flex items-end gap-x-2"
        :dir="authUser === message.user.id ? 'rtl' : 'ltr'"
    >
        <img
            :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(
                message.user.name
            )}`"
            alt="{{ message.user }}"
        />

        <div
            class="rounded-lg p-2 max-w-lg"
            :class="
                authUser === message.user.id
                    ? 'bg-success text-white'
                    : 'bg-warning'
            "
        >
            <div class="break-all">{{ message.body }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
    authUser: Number,
});
</script>
