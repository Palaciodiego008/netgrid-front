<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">Projects</h2>
    <!-- Mostrar el botón "Create" si el usuario es un administrador -->
    <router-link v-if="currentUser && currentUser.role === 'admin'" to="/dashboard/create-project"
      class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Create
    </router-link>

    <div v-if="projects.length === 0">
      <p class="text-gray-500">There are no projects yet.</p>
    </div>

    <div v-else class="overflow-x-auto mt-4">
      <table class="min-w-full">
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
              Start Date
            </th>
            <th
              class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
            <router-link :to="`/dashboard/show-project/${project.id}`">{{ project.id }}</router-link>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              {{ project.title }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              {{ project.description }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              {{ project.start_date }}
            </td>
            <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
              {{ project.end_date }}
            </td>

            <td v-if="currentUser && currentUser.role === 'admin'" class="px-6 py-4 whitespace-no-wrap text-sm leading-5">
              <button @click="editProject(project.id)" class="text-blue-600 hover:underline mr-2">Edit</button>
              <button @click="deleteProject(project.id)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProjectsService from "@/services/projects.js";
import AuthService from "@/services/auth.js";

export default {
  data() {
    return {
      projects: [],
      currentUser: null,
    };
  },
  mounted() {
    this.loadProjects();
    this.fetchCurrentUser();
  },
  methods: {
    async fetchCurrentUser() {
      AuthService.getCurrentUser()
        .then((response) => {
          this.currentUser = response.data.userData;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadProjects() {
      ProjectsService.getAll()
        .then((response) => {
          this.projects = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    editProject(projectId) {
      this.$router.push(`/dashboard/edit-project/${projectId}`);
    },
    deleteProject(projectId) {
      ProjectsService.delete(projectId)
        .then((response) => {
          this.loadProjects();
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
