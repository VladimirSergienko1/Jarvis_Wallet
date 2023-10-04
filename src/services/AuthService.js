import $api from "../http/api.js";
import { $apiUser } from "../http/api.js";

class AuthService {
    static async login(email, password) {
        return $api.post('/signin', {email, password});
    }

    static async registration(name, email, phoneNumber = null, password, language = "en") {
        return $api.post('/registration', {name, email, phoneNumber, password, language});
    }

    static async checkAuth() {
        return $apiUser.get('/current');

    }


    static async logout() {
        return $api.post('/logout');
    }
}

export default AuthService;
