<template>
    <div class="flex items-end gap-x-2" :dir="message.current ? 'rtl' : 'ltr'">

        <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(message.user)}`"  alt="{{ message.user }}" />

        <div class="rounded-lg p-2 max-w-lg relative">

            <p>{{ message.body }}</p>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
});
</script>
