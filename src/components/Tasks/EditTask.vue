<template>
    <div class="container mx-auto p-4">
        <h2 class="text-2xl font-semibold mb-4">Edit Task</h2>

        <!-- Formulario de edición de tarea -->
        <form @submit.prevent="updateTask">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                    Title
                </label>
                <input v-model="task.title" type="text" id="title" name="title" class="border rounded w-full py-2 px-3"
                    required />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                    Description
                </label>
                <textarea v-model="task.description" id="description" name="description"
                    class="border rounded w-full py-2 px-3" required></textarea>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
                    Status
                </label>
                <select v-model="task.status" id="status" name="status" class="border rounded w-full py-2 px-3" required>
                    <option value="pending" v-bind:selected="task.status === 'pending'">Pending</option>
                    <option value="in-progress" v-bind:selected="task.status === 'in-progress'">In Progress</option>
                    <option value="completed" v-bind:selected="task.status === 'completed'">Completed</option>
                </select>

            </div>

            <div>
                <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update
                    Task</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import TaskService from "@/services/tasks.js";

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
    created() {
        const projectId = this.$route.params.projectId;
        const taskId = this.$route.params.id;

        TaskService.get(projectId, taskId)
            .then((response) => {
                this.task = response.data.data;
                console.log("Task:", this.task);
            })
            .catch((error) => {
                console.error("Error fetching task data:", error);
            });
    },
    methods: {
        updateTask() {
            const projectId = this.$route.params.projectId;
            const taskId = this.$route.params.id;

            TaskService.update(projectId, taskId, this.task)
                .then((response) => {
                    console.log("Task updated:", response.data);
                    // Redirigir a la vista de detalles de la tarea o a donde desees
                    this.$router.push({ name: "showTask", params: { projectId, id: taskId } });
                })
                .catch((error) => {
                    console.error("Error updating task:", error);
                });
        },
    },
};
</script>
  