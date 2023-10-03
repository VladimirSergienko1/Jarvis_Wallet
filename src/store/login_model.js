import {createEffect, createEvent, createStore} from "effector";
import AuthService from "../services/AuthService.js";
import Cookies from "js-cookie";


const $isAuth = createStore(false);

const setAth = createEvent();

export const loginFx = createEffect( async ({email, password}) => {
    try {
        const response = await AuthService.login(email, password);
        Cookies.set('access_token', response.data.accessToken, { expires: 1 });
        Cookies.set('refresh_token', response.data.refreshToken, { expires: 1 });
        console.log('Success',response)
        console.log('User', response.config.data)
        console.log('isAuth',$isAuth.getState());
    }
    catch (e) {
        console.log(e?.message)
    }
})

export const registrationFx = createEffect( async ({name, email, phone,password,language}) => {
    try {
        const response = await AuthService.registration(name, email, phone, password, language);
        console.log('Success',response)
        console.log('User', response.config.data)
        console.log('isAuth',$isAuth.getState());
    }
    catch (e) {
        console.log(e?.message)
    }

})


$isAuth.on(loginFx.doneData, () => true)
console.log('isAuth',$isAuth.getState());
/*
$isAuth.on(loginFx.doneData, (state, payload) => {
    console.log('Payload from effect:', payload);
    console.log('isAuth',$isAuth.getState());
    return true;
});
*/
