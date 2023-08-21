<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 shadow-md rounded-md w-96">
            <h2 class="text-2xl font-semibold mb-4">Register</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="name" type="text" id="name" name="name"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" id="email" name="email"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" id="password" name="password"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300">
                </div>
                <div class="mb-6">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input v-model="confirmPassword" type="password" id="confirmPassword" name="confirmPassword"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300">
                </div>
                <div>
                    <button type="submit"
                        class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Register',
    setup() {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        const register = () => {
            // Get CSRF token
            axios.get('/sanctum/csrf-cookie');
            axios.post('/api/register')
        };

        return {
            name,
            email,
            password,
            confirmPassword,
            register,
        };
    },
};
</script>

<style>
/* You can add custom styles here if needed */
</style>
