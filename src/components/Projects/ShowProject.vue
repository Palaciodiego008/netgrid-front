<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Project Details</h2>
  
      <div class="mb-4">
        <div class="border rounded p-4">
          <p><strong>Title:</strong> {{ project.title }}</p>
          <p><strong>Description:</strong> {{ project.description }}</p>
        </div>
      </div>
  
      <div>
        <h3 class="text-lg font-semibold mb-2">Project Tasks</h3>
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
                Status
              </th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project.tasks" :key="task.id">
              <td class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {{ task.id }}
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
                <button @click="editTask(task.id)" class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">Delete</button>
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
        project: {
          title: "",
          description: "",
          status: "",
          tasks: [],
        },
      };
    },
    created() {
      const projectId = this.$route.params.id;
      this.loadProject(projectId);
    },
    methods: {
      loadProject(id) {
        ProjectsService.get(id)
          .then((response) => {
            this.project = response.data.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    //   editTask(taskId) {
    //     // Implementa la lógica para editar una tarea aquí
    //   },
    //   deleteTask(taskId) {
    //     // Implementa la lógica para eliminar una tarea aquí
    //   },
    },
  };
  </script>
  