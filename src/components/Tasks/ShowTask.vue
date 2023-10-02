<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Task Details</h2>
  
      <div class="border rounded p-4">
        <p><strong>Title:</strong> {{ task.title }}</p>
        <p><strong>Description:</strong> {{ task.description }}</p>
        <p><strong>Status:</strong> {{ task.status }}</p>
      </div>

      <div class="mt-4">
        <router-link :to="'/dashboard/projects/' + projectId" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">
          Back
        </router-link>
  

        <router-link :to="'/dashboard/projects/' + projectId + '/tasks/' + taskId + '/edit'" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Edit
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
   import TasksService from "@/services/tasks.js";
  
  export default {
    data() {
      return {
        task: {
          id: 0,
          title: "",
          description: "",
          status: "",
        },
        projectId: 0,
        taskId: 0,
      };
    },
    created() {
      this.projectId = this.$route.params.projectId;
      this.taskId = this.$route.params.id;
  
      TasksService.get(this.projectId, this.taskId)
        .then((response) => {
          console.log("Task:", response.data);
          this.task = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  