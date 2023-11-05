import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice.js'
import userReducer from '../features/user/userSlice.js'
export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
    },
});

console.log('Test',loginReducer)