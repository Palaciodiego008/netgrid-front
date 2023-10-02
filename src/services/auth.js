import http from "../http-common";

class AuthService {
    register(data) {
        return http.post("register", data);
    }

    login(data) {
      return http.post("/login", data);
    }

  
    logout(data) {
        return http.post("/logout", data);
    }

}

export default new AuthService();
