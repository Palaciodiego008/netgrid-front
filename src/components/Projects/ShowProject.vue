<template>
    <div class="container mx-auto p-4">
        <h2 class="text-2xl font-semibold mb-4">Project Details</h2>

        <div>
            <div class="border rounded p-4">
                <p><strong>Title:</strong> {{ project.title }}</p>
                <p><strong>Description:</strong> {{ project.description }}</p>
            </div>
        </div>


        <div>
            <h3 class="text-lg font-semibold mb-2">Project Tasks</h3>
            <router-link v-if="isAdmin" :to="`/dashboard/projects/${$route.params.id}/create-task`"
                class="mb-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create
            </router-link>


            <div v-if="tasks && tasks.length === 0">
                <p class="text-gray-500">There are no Tasks yet.</p>
            </div>
            <div v-else-if="tasks">
                <table class="min-w-full mb-4">
                    <thead>
                        <tr>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in tasks" :key="task.id">
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                <router-link :to="`/dashboard/projects/${project.id}/tasks/${task.id}`">
                                    {{ task.id }}
                                </router-link>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {{ task.title }}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {{ task.description }}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                {{ task.status }}
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                <!-- Verificar si el usuario es un administrador para mostrar botones -->
                                <button v-if="isAdmin" @click="editTask(task.id)"
                                    class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                                <button v-if="isAdmin" @click="deleteTask(task.id)"
                                    class="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectsService from "@/services/projects.js";
import TasksService from "@/services/tasks.js";
import AuthService from "@/services/auth.js";

export default {
    data() {
        return {
            project: {
                id: "",
                title: "",
                description: "",
            },
            isAdmin: false,
            tasks: [],
        };
    },
    mounted() {
        this.currentUserIsAdmin();
    },
    created() {
        const projectId = this.$route.params.id;
        this.loadProject(projectId);
        this.loadTasks(projectId);
    },
    methods: {
        async currentUserIsAdmin() {
            AuthService.getCurrentUser()
                .then((response) => {
                    this.isAdmin = response.data.userData.role === "admin";
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        loadProject(id) {
            ProjectsService.get(id)
                .then((response) => {
                    this.project = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        loadTasks(projectId) {
            TasksService.getAll(projectId)
                .then((response) => {
                    this.tasks = response.data.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        deleteTask(taskId) {
            TasksService.delete(this.project.id, taskId)
                .then((response) => {
                    this.loadTasks(this.project.id);
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        editTask(taskId) {
            this.$router.push(`/dashboard/projects/${this.project.id}/tasks/${taskId}/edit`);
        },
    },
};
</script>
