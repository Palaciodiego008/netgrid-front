<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Barra lateral (sidebar) -->
        <aside class="w-64 bg-blue-500 text-white">
            <div class="p-4">
                <h2 class="text-2xl font-semibold">Dashboard</h2>
                <ul class="mt-4">
                    <li>
                        <router-link to="/dashboard" class="block py-2 px-4 hover:bg-blue-600">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/dashboard/projects" class="block py-2 px-4 hover:bg-blue-600">Projects</router-link>
                    </li>
                </ul>
            </div>
        </aside>
        <main class="flex-1 p-4 relative">
            <!-- Barra superior con nombre del usuario y botón de Cerrar Sesión -->
            <div class="flex justify-between items-center">
                <div class="mb-4" v-if="currentUser">
                    <h2 class="text-2xl font-semibold">Welcome, {{ currentUser.name }}!</h2>
                </div>
                <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
                    Logout
                </button>
            </div>
            <router-view></router-view>
        </main>
    </div>
</template>
  
<script>
import AuthService from "../services/auth";

export default {
    name: "DashboardLayout",
    data() {
        return {
            currentUser: null,
        };
    },
    methods: {
        async fetchCurrentUser() {
            AuthService.getCurrentUser()
                .then((response) => {
                    console.log(response);
                    this.currentUser = response.data.userData
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        logout() {
            const token = localStorage.getItem("token");
            if (token) {
                AuthService.logout()
                    .then((response) => {
                        localStorage.removeItem("token");
                        this.$router.push("/");
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                this.$router.push("/");
            }
        },
    },
    mounted() {
        this.fetchCurrentUser();
    },
};
</script>
  