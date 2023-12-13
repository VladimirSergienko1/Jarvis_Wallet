import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice.js'
import userReducer from '../features/user/userSlice.js'
import uiSlice from "../features/ui/uiSlice.js";
export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        ui: uiSlice,
    },
});

console.log('Test',loginReducer)