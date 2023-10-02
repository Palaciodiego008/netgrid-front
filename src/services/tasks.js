import http from "../http-common";

class TaskService {
    getAll(projectId) {
        return http.get(`/projects/${projectId}/tasks`);
    }

    get(projectId, id) {
        return http.get(`/projects/${projectId}/tasks/${id}`);
    }

    create(projectId, data) {
        return http.post(`/projects/${projectId}/tasks`, data);
    }

    update(projectId, id, data) {
        return http.put(`/projects/${projectId}/tasks/${id}`, data); 
    }

    delete(projectId, id) {
        return http.delete(`/projects/${projectId}/tasks/${id}`);
    }
}

export default new TaskService();
