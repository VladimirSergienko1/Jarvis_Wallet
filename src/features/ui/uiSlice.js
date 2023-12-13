import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState ={
    accountModalIsVisible: false,
    overlayIsVisible: false,
    error: null,
    isLoading: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setAccountModalVisible: (state, action) => {
            state.accountModalIsVisible = action.payload;
        },
        setOverlayVisible: (state, action) => {
            state.overlayIsVisible = action.payload;
        },
        setOverAndAccModal: (state, action) => {
            state.overlayIsVisible = action.payload;
            state.accountModalIsVisible = action.payload;
        },

    },
    extraReducers: (builder) => {
        //builder
           /* .addCase(blabla.fulfilled, (state, action) => {
                state.blabla = true;
            })*/

    },
})

console.log('uiSlice',uiSlice)
export const {setAccountModalVisible,setOverlayVisible, setOverAndAccModal} = uiSlice.actions
export default uiSlice.reducer