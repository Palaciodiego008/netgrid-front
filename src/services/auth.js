import http from "../http-common";

class AuthService {
    register(data) {
        return http.post("register", data);
    }

    login(data) {
      return http.post("/login", data);
    }

  
    logout() {
        return http.post("/logout");
    }

    getCurrentUser() {
        return http.get("/user-profile");
    }

}

export default new AuthService();
