import {createEffect} from "effector";
import AuthService from "../services/AuthService.js";
import Cookies from "js-cookie";


export const loginFx = createEffect( async ({email, password}) => {
    try {
        const response = await AuthService.login(email, password);
        Cookies.set('access_token', response.data.accessToken, { expires: 1 });
        Cookies.set('refresh_token', response.data.refreshToken, { expires: 1 });
        console.log('Success',response)
        console.log('User', response.config.data)

    }
    catch (error) {
        console.log(error)
    }

})