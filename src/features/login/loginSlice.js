import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";
import Cookies from "js-cookie";
import { notification } from 'antd';
import {setUserData} from "../user/userSlice.js";

const openNotification = (type, message, description) => {
    notification[type]({
        message: message,
        description: description,
    });
};

export const loginUser = createAsyncThunk(
    'login/user',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await AuthService.login(email, password);
            Cookies.set('access_token', response.data.access_token, { expires: 1 });
            Cookies.set('refresh_token', response.data.refresh_token, { expires: 1 });
            return response.data;
        } catch (error) {
            openNotification('error', 'Ошибка входа', error.message);
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'register/user',
    async ({name, email, phone_number, password, language, telegram_username ,ico_id}, {rejectedWithValue})=>{
        try {
            const response = await AuthService.registration(name, email, phone_number, password, language, telegram_username, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)



const initialState ={
    registrationData: null,
    error: null,
    isLoading: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       /* setLoggedIn: (state, action) => {
            state.isLogged = action.payload;
        },*/
        setRegistrationData: (state, action) => {
            state.registrationData = action.payload;
        },
        clearRegistrationData: (state) => {
            state.registrationData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLogged = true;

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLogged = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
            })

    },
})

console.log('loginSlice',loginSlice)
export const {setRegistrationData} = loginSlice.actions
export default loginSlice.reducer