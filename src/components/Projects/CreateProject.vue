<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Create Project</h2>
      <form @submit.prevent="createProject">
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
          <input v-model="formData.start_date" type="date" id="start_date" name="start_date" class="w-full border rounded px-3 py-2" required>
        </div>
  
        <div class="mb-4">
          <label for="end_date" class="block text-gray-600 text-sm font-medium mb-1">End Date</label>
          <input v-model="formData.end_date" type="date" id="end_date" name="end_date" class="w-full border rounded px-3 py-2" required>
        </div>
  
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create</button>
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
          start_date: "",
          end_date: "",
        },
      };
    },
    methods: {
      createProject() {
        ProjectsService.create(this.formData)
          .then((response) => {
            console.log(response);
            this.$router.push("/dashboard/projects");
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  