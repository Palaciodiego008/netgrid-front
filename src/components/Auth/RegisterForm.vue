<template>
  <div class="max-w-md mx-auto mt-10 p-4">
    <h2 class="text-2xl font-semibold mb-6">Create Account</h2>
    <form @submit.prevent="registerUser">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input v-model="user.name" type="text" id="name" name="name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline" required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input v-model="user.email" type="email" id="email" name="email"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline" required />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="role">Role</label>
        <select v-model="user.role" id="role" name="role"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline" required>
          <option value="admin">Admin</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input v-model="user.password" type="password" id="password" name="password"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline" required />
      </div>
    

      <div class="mb-6">
        <button type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600">
          Create
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthService from "@/services/auth";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: '',
      },
    };
  },
  methods: {
    registerUser() {
      AuthService.register(this.user)
        .then((response) => {
          this.$router.push("/");
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
