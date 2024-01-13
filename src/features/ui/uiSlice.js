import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState ={
    accountModalIsVisible: false,
    overlayIsVisible: false,
    incomeOverlayIsVisible:false,
    expenseOverlayIsVisible:false,
    incomeModalIsVisible: false,
    expenseModalIsVisible: false,
    transferModalIsVisible: false,
    loanModalIsVisible: false,
    obligationModalIsVisible: false,
    assetModalIsVisible: false,
    budgetModalIsVisible: false,
    accountModalDataForEditing: null,
    incomeDataForEditing: null,
    sourceDataForEditing: null,
    incomeTab: 'income',
    expenseTab: 'expense',
    error: null,
    isDeletionMode: false,
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
        setDeletionMode: (state, action) => {
            state.isDeletionMode = action.payload;
        },
        setOverAndAccModal: (state, action) => {
            state.overlayIsVisible = action.payload;
            state.accountModalIsVisible = action.payload;
        },
        setOverAndIncomeModal: (state, action) => {
            state.incomeOverlayIsVisible = action.payload;
            state.incomeModalIsVisible = action.payload;
        },
        setOverAndExpenseModal: (state, action) => {
            state.expenseOverlayIsVisible = action.payload;
            state.expenseModalIsVisible = action.payload;
        },
        setAccountModalDataForEditing: (state,action) => {
            state.accountModalDataForEditing = action.payload
        },
        setIncomeDataForEditing: (state,action) => {
            state.incomeDataForEditing = action.payload
        },
        setSourceDataForEditing: (state,action) => {
            state.sourceDataForEditing = action.payload
        },
        setIncomeTab: (state, action) => {
            state.incomeTab = action.payload;
        },
        setExpenseTab: (state, action) => {
            state.expenseTab = action.payload;
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
export const {setAccountModalVisible,setOverAndExpenseModal,setOverlayVisible,setDeletionMode,setSourceDataForEditing, setOverAndAccModal, setIncomeTab, setAccountModalDataForEditing, setOverAndIncomeModal, setExpenseTab, setIncomeDataForEditing} = uiSlice.actions
export default uiSlice.reducer