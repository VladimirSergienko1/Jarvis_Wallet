import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";

export const createAccount = createAsyncThunk(
    'create/account',
    async ({name, comment, currency, value, ico_id}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.createAccount(name, comment, currency, value, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const editAccount = createAsyncThunk(
    'edit/account',
    async ({account_id, name, comment, currency, value, ico_id}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.editAccount(account_id, name, comment, currency, value, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'delete/account',
    async (account_id, {dispatch, rejectedWithValue})=>{
        try {
            const response = await AuthService.deleteAccount(account_id)
            dispatch(getAccountList());
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const createIncome = createAsyncThunk(
    'create/income',
    async ({source_id, account_id, amount, comment, time_at}, {rejectedWithValue})=>{
        try {
            const response = await AuthService.createIncome(source_id, account_id, amount, comment, time_at)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_,{rejectedWithValue}) =>{
        try {
            const response = await AuthService.checkAuth()
            console.log('Success Auth',response)
            return response.data;
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const getAccountList = createAsyncThunk(
    'get/accountList',
    async (_,{rejectedWithValue})=>{
        try {
            const response = await AuthService.getAccountList()
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const getIncomeSourceList = createAsyncThunk(
    'get/incomeSourceList',
    async (_,{rejectedWithValue})=>{
        try {
            const response = await AuthService.getIncomeSourcesList()
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const getIncomeList = createAsyncThunk(
    'get/incomeList',
    async (_,{rejectedWithValue})=>{
        try {
            const response = await AuthService.getIncomeList()
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const getSingleAccount = createAsyncThunk(
    'get/singleAccount',
    async ({id},{rejectedWithValue})=>{
        try {
            const response = await AuthService.getSingleAccount(id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

const initialState ={
    isLogged: false,
    isLoading: true,
    accountsLoading: true,
    userData: null,
    userAccounts: [],
    userTheme: localStorage.getItem('theme') || 'light',
    userIncomes: [],
    userIncomeSource: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action)=>{
            state.userData = action.payload
        },
        setUserAccounts: (state, action) => {
            state.userAccounts = action.payload;
        },
        setUserTheme: (state, action) => {
            state.userTheme = action.payload;
        }
    },
    extraReducers:(builder)=> {
        builder
            .addCase(checkAuth.pending, (state,action)=>{
            state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLogged = true;
                state.isLoading = false;
                state.userData = action.payload
                console.log('userData Slice test',action)
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })

            //
            .addCase(getAccountList.pending, (state,action)=>{
                state.accountsLoading = true;
            })
            .addCase(getAccountList.fulfilled, (state, action) => {
                state.accountsLoading = false;
                state.userAccounts = action.payload
                console.log('userAccounts Slice test',action)
            })
            .addCase(getAccountList.rejected, (state, action) => {
                state.error = action.payload;
                state.accountsLoading = false;
            })
            .addCase(getIncomeSourceList.pending, (state,action)=>{
            })
            .addCase(getIncomeSourceList.fulfilled, (state, action) => {
                state.userIncomeSource = action.payload
            })
            .addCase(getIncomeSourceList.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getIncomeList.pending, (state,action)=>{
            })
            .addCase(getIncomeList.fulfilled, (state, action) => {
                state.userIncomes = action.payload
            })
            .addCase(getIncomeList.rejected, (state, action) => {
                state.error = action.payload;
            })
            //
            .addCase(createAccount.pending, (state,action)=>{
           // state.isLoading = true;
             })
            .addCase(createAccount.fulfilled, (state, action) => {
                //state.isLoading = false;
                //state.userAccounts = [...state.userAccounts, action.payload];
                state.userAccounts.push(action.payload);
                console.log('userData Slice test',action)
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(editAccount.pending, (state,action)=>{
                // state.isLoading = true;
            })
            .addCase(editAccount.fulfilled, (state, action) => {
                const index = state.userAccounts.findIndex(account => account.id === action.payload.id);
                if (index !== -1) {
                    state.userAccounts[index] = action.payload;
                }
            })
            .addCase(editAccount.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(deleteAccount.pending, (state,action)=>{
                // state.isLoading = true;
            })
            .addCase(deleteAccount.fulfilled, (state, action, { dispatch }) => {

            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(createIncome.pending, (state,action)=>{
                // state.isLoading = true;
            })
            .addCase(createIncome.fulfilled, (state, action) => {
                state.userIncomes.push(action.payload);
            })
            .addCase(createIncome.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(getSingleAccount.pending,(state, action) => {
                state.isLoading = true;
            })
            .addCase(getSingleAccount.fulfilled,(state, action) => {
                state.isLoading = false;
            })
            .addCase(getSingleAccount.rejected,(state, action) => {
                state.isLoading = false;
            })

    },
})

export const {setUserData,setUserAccounts,setUserTheme } = userSlice.actions
export default userSlice.reducer