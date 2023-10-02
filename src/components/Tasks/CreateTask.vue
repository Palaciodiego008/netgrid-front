<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-semibold mb-4">Create Task</h2>
  
      <form @submit.prevent="createTask">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            v-model="task.title"
            type="text"
            id="title"
            name="title"
            class="border rounded w-full py-2 px-3"
            required
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Description
          </label>
          <textarea
            v-model="task.description"
            id="description"
            name="description"
            class="border rounded w-full py-2 px-3"
            required
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
            Status
          </label>
          <select
            v-model="task.status"
            id="status"
            name="status"
            class="border rounded w-full py-2 px-3"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
  
        <div class="mb-4">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Task
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import TasksService from "@/services/tasks.js";
  
  export default {
    data() {
      return {
        task: {
          title: "",
          description: "",
          status: "",
        },
      };
    },
    methods: {
      createTask() {
        const projectId = this.$route.params.id;
        TasksService.create(projectId, this.task)
          .then((response) => {
            console.log("Task created:", response.data);
            this.$router.push(`/dashboard/projects/${projectId}`);
          })
          .catch((error) => {
            console.error("Error creating task:", error);
          });
      },
    },
  };
  </script>
  