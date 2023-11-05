import axios from "axios";
import Cookies from 'js-cookie';
import api from "js-cookie";
export const API_URL = 'https://jarviswallet.pro/api/v1/access/';
export const API_URL_USERS = 'https://jarviswallet.pro/api/v1/users/';

export const API_URL_ACCOUNTS = 'https://jarviswallet.pro/api/v1/accounts/'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

export const $apiUser = axios.create({
    withCredentials: true,
    baseURL: API_URL_USERS
})

export const $apiAccounts = axios.create({
    withCredentials: true,
    baseURL: API_URL_ACCOUNTS
})

$apiAccounts.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Cookies.get('access_token')}`;
    /*console.log(Cookies.get('access_token'))*/
    return config;
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${Cookies.get('access_token')}`;
    /*console.log(Cookies.get('access_token'))*/
    return config;
})

$apiUser.interceptors.request.use(config => {
    const token = Cookies.get('access_token');
    if (!token) {
        console.error('No access token found!');
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;

})

/*$api.interceptors.response.use((config)=>{
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`${$api}/refresh`, {withCredentials: true});
            Cookies.setItem('access_token', response.data.access_token);
            return $api.request(originalRequest);
        }
        catch (e){
            console.log('Не авторизован',e)
        }
    }
    throw error;
})*/

export default $api;
