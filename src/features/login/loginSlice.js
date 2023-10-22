import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";
import Cookies from "js-cookie";

export const loginUser = createAsyncThunk(
    'login/user',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await AuthService.login(email, password);
            Cookies.set('access_token', response.data.access_token, { expires: 1 });
            Cookies.set('refresh_token', response.data.refresh_token, { expires: 1 });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const initialState ={
    isLogged: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLogged = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLogged = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
})

console.log('loginSlice',loginSlice)
export default loginSlice.reducer