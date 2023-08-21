<template>
    <div class="flex items-center" :dir="message.user.current ? 'rtl' : 'ltr'">
        <div>
            <p>{{ message.user.name }}</p>
        </div>

        <div
            class="rounded-full p-4 w-fit"
            :class="message.user.current ? 'bg-darkgray text-white' : 'bg-lightgray'"
        >
            <p>{{ message.body }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: Object,
});
</script>
