
<template>
    <div class="flex items-center">
        <div>
            <p>{{ message.user.email }}</p>

        </div>
        <div class="rounded-full p-4 w-fit" :class="{ 'bg-blue-500': message.user.current }">
            <p>{{ message.body }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    message: Object,
});
</script>
