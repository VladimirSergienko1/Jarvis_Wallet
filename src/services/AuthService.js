import $api, {$apiAccounts, $apiIncome, $apiIncomeSources} from "../http/api.js";
import { $apiUser } from "../http/api.js";

class AuthService {
    static async login(email, password) {
        return $api.post('/signin', {email, password});
    }

    static async registration(name, email, phone_number = null, password, language = "en", telegram_username = null, ico_id= 0) {
        return $api.post('/registration', {name, email, phone_number, password, language, telegram_username, ico_id});
    }

    static async checkAuth() {
        return $apiUser.get('/current');

    }

    static async logout() {
        return $api.post('/logout');
    }

    static async createAccount(name, comment, currency, value, ico_id  = 0){
        return $apiAccounts.post('/create', {name, comment, currency, value, ico_id})
    }

    static async editAccount(account_id, name, comment, currency, value,ico_id  = 0){
        return $apiAccounts.put(`/update/${account_id}`, {name, comment, currency, value, ico_id})
    }
    static async deleteAccount(account_id){
        return $apiAccounts.delete(`/delete/${account_id}`)
    }
    static async createIncome(source_id, account_id, amount, comment, time_at ){
        return $apiIncome.post('/create', {source_id, account_id, amount, comment, time_at})
    }
    static async editIncome(income_id, source_id, account_id, amount, comment, time_at){
        return $apiIncome.put(`/update/${income_id}`, {source_id, account_id, amount, comment, time_at})
    }
    static async deleteIncome(income_id){
        return $apiIncome.delete(`/delete/${income_id}`)
    }

    static async createIncomeSource(name, comment, ico_id = 0 ){
        return $apiIncomeSources.post('/create', {name, comment, ico_id})
    }

    static async editIncomeSource(source_id, name, comment, ico_id = 0){
        return $apiIncomeSources.put(`/update/${source_id}`, {name, comment, ico_id})
    }
    static async deleteIncomeSource(incomeSource_id){
        return $apiIncomeSources.delete(`/delete/${incomeSource_id}`)
    }



    static async getAccountList (){
        return $apiAccounts.get('/list')
    }
    static async getSingleAccount (id){
        return $apiAccounts.get(`/${id}`)

    }
    static async getIncomeSourcesList (){
        return $apiIncomeSources.get('/list')
    }
    static async getIncomeList (){
        return $apiIncome.get('/list')
    }

}

export default AuthService;
