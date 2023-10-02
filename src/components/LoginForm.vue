<template>
    <div class="max-w-md mx-auto mt-10 p-4">
      <h2 class="text-2xl font-semibold mb-6">Login</h2>
      <form @submit.prevent="loginUser">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            name="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
      <!-- Botón de registro -->
      <div class="text-center">
        <p class="text-gray-600">Don't have an account?</p>
        <router-link to="/register" class="text-blue-500 hover:underline">Register</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from "../services/auth";
  
  export default {
    name: "login-form",
    data() {
      return {
        user: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      loginUser() {
        AuthService.login(this.user)
          .then((response) => {
            console.log(response);
            // Redirigir o realizar alguna acción después de iniciar sesión
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  