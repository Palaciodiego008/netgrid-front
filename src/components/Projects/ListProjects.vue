<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Projects</h2>
      <router-link to="/dashboard/create-project" class="mb-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Create
      </router-link>
  
      <div v-if="projects.length === 0">
        <p class="text-gray-500">There are no projects yet.</p>
      </div>
  

      <div v-else class="overflow-x-auto mt-4">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {{ project.id }}
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import ProjectsService from "@/services/projects.js";
  
  export default {
    data() {
      return {
        projects: [],
      };
    },
    mounted() {
      this.loadProjects();
    },
    methods: {
      loadProjects() {
        ProjectsService.getAll()
          .then((response) => {
            this.projects = response.data.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  