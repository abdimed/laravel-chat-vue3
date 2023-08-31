<template>
    <div class="flex items-end gap-x-2" :dir="message.user.current ? 'rtl' : 'ltr'">

        <img :src="`https://ui-avatars.com/api/?rounded=true&size=40&name=${encodeURIComponent(message.user.name)}`"  alt="">

        <div class="rounded-lg p-2 max-w-lg relative"
            :class="message.user.current ? 'bg-secondary text-black' : 'bg-gray-200 dark:bg-darkgray'">
            <p>{{ message.body }}</p>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
});
</script>
