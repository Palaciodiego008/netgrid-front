<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Edit Project</h2>
      <form @submit.prevent="updateProject">
        <div class="mb-4">
          <label for="title" class="block text-gray-600 text-sm font-medium mb-1">Title</label>
          <input v-model="formData.title" type="text" id="title" name="title" class="w-full border rounded px-3 py-2" required>
        </div>
  
        <div class="mb-4">
          <label for="description" class="block text-gray-600 text-sm font-medium mb-1">Description</label>
          <textarea v-model="formData.description" id="description" name="description" rows="4" class="w-full border rounded px-3 py-2" required></textarea>
        </div>
  
        <div class="mb-4">
          <label for="start_date" class="block text-gray-600 text-sm font-medium mb-1">Start Date</label>
          <input v-model="formattedStartDate" type="date" id="start_date" name="start_date" class="w-full border rounded px-3 py-2" required>
        </div>
  
        <div class="mb-4">
          <label for="end_date" class="block text-gray-600 text-sm font-medium mb-1">End Date</label>
          <input v-model="formattedEndDate" type="date" id="end_date" name="end_date" class="w-full border rounded px-3 py-2" required>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  import ProjectsService from "@/services/projects.js";
  
  export default {
    data() {
      return {
        formData: {
          title: "",
          description: "",
          formattedStartDate: "", // Cambio el nombre para evitar conflicto con v-model
          formattedEndDate: "",   // Cambio el nombre para evitar conflicto con v-model
        },
      };
    },
    created() {
      const projectId = this.$route.params.id;
      ProjectsService.get(projectId)
        .then((response) => {
          const projectData = response.data.data;
          this.formData = {
            ...projectData,
            formattedStartDate: new Date(projectData.start_date).toISOString().split('T')[0],
            formattedEndDate: new Date(projectData.end_date).toISOString().split('T')[0],
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    computed: {
      formattedStartDate: {
        get() {
          return this.formData.formattedStartDate;
        },
        set(value) {
          this.formData.formattedStartDate = value;
        },
      },
      formattedEndDate: {
        get() {
          return this.formData.formattedEndDate;
        },
        set(value) {
          this.formData.formattedEndDate = value;
        },
      },
    },
    methods: {
      updateProject() {
        const projectId = this.$route.params.id;
        this.formData.start_date = this.formattedStartDate;
        this.formData.end_date = this.formattedEndDate;
        
        ProjectsService.update(projectId, this.formData)
          .then((response) => {
            console.log(response);
            this.$router.push("/dashboard/projects");
          })
          .catch((error) => {
            console.error("Error al actualizar el proyecto:", error);
          });
      },
    },
  };
  </script>
  