import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice.js'
export const store = configureStore({
    reducer: {
        login: loginReducer,
    },
});

console.log('Test',loginReducer)