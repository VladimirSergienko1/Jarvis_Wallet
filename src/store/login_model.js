import {createEffect, createEvent, createStore, sample} from "effector";
import AuthService from "../services/AuthService.js";
import Cookies from "js-cookie";
import axios from "axios";
import $api from "../http/api.js";
import {createGate} from "effector-react";


export const $isAuth = createStore(false);

const setAth = createEvent();

export const loginFx = createEffect( async ({email, password}) => {
    try {
        const response = await AuthService.login(email, password);
        Cookies.set('access_token', response.data.access_token, { expires: 1 });
        Cookies.set('refresh_token', response.data.refresh_token, { expires: 1 });
        console.log('Success',response)
     /*   console.log('User', response.config.data)
        console.log('isAuth',$isAuth.getState());*/
        return response
    }
    catch (e) {
        console.log(e?.message)
        throw e;
    }
})

/*export const registrationFx = createEffect( async ({name, email, phone,password,language}) => {
    try {
        const response = await AuthService.registration(name, email, phone, password, language);

        console.log('Success',response)
        console.log('User', response.config.data)
     /!*   console.log('isAuth',$isAuth.getState());*!/
    }
    catch (e) {
        console.log(e?.message)
    }
})*/


export const checkAuthFx = createEffect(async (access_token) => {
    try {
        const response = await AuthService.checkAuth();
        console.log('Success checkAuth',response)
        return response.data
    } catch (e) {
        console.log(e?.message)
        throw e;
    }
})

$isAuth.on(loginFx.done, () => true)
       .on(checkAuthFx.done, () => true)
       .reset(checkAuthFx.fail);


loginFx.failData.watch((error) => {
    console.log(error?.message);
    $isAuth.reset();
});
console.log('isAuth',$isAuth.getState());

export const AuthGate =createGate()

sample({
    /*source: $isAuth,*/
    clock: AuthGate.open,
    target: checkAuthFx
})
