import { configureStore } from '@reduxjs/toolkit';
import myReducer from './myReducer'; // Import your reducer

export const login_store = configureStore({
    reducer: {
        mySlice: myReducer,
    },
});
