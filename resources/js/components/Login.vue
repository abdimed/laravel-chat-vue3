<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
            <h2 class="text-2xl font-semibold mb-4">Login</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input type="email" id="email" v-model="email" required
                        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label>
                    <input type="password" id="password" v-model="password" required
                        class="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300" />
                </div>
                <div>
                    <button type="submit"
                        class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('/api/login', {
      email: email.value,
      password: password.value,
    });

    const { user, token } = response.data;

    console.log('User:', user);
    console.log('Token:', token);

  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
