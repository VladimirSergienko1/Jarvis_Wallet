import $api from "../http/api.js";

class AuthService {
    static async login(email, password) {
        return $api.post('/signin', {email, password});
    }

    static async registration(email, password) {
        return $api.post('/registration', {email, password});
    }

    static async logout() {
        return $api.post('/logout');
    }
}

export default AuthService;
