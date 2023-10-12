// myReducer.js
import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
    name: 'mySlice',
    initialState: {
        isAuth: false,
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export default mySlice.reducer;
export const { setAuth } = mySlice.actions;
