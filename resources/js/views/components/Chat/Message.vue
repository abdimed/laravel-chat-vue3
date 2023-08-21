<template>
    <div class="flex items-end" :dir="message.user.current ? 'rtl' : 'ltr'">

        <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(message.user.name)}`"  alt="">

        <div class="rounded-lg p-2 max-w-lg relative"
            :class="message.user.current ? 'bg-darkgray text-white' : 'bg-lightgray'">
            <p>{{ message.body }}</p>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
});
</script>
