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

export const editIncome = createAsyncThunk(
    'edit/income',
    async ({income_id, source_id, account_id, amount, comment, time_at}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.editIncome(income_id, source_id, account_id, amount, comment, time_at)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const deleteIncome = createAsyncThunk(
    'delete/income',
    async (income_id, {dispatch, rejectedWithValue})=>{
        try {
            const response = await AuthService.deleteIncome(income_id)
            dispatch(getIncomeList());
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const createIncomeSource = createAsyncThunk(
    'create/incomeSource',
    async ({name, comment, ico_id}, {rejectedWithValue})=>{
        try {
            const response = await AuthService.createIncomeSource(name, comment, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const editIncomeSource = createAsyncThunk(
    'edit/incomeSource',
    async ({source_id, name, comment, ico_id}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.editIncomeSource(source_id, name, comment, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const deleteIncomeSource = createAsyncThunk(
    'delete/incomeSource',
    async (incomeSource_id, {dispatch, rejectedWithValue})=>{
        try {
            const response = await AuthService.deleteIncomeSource(incomeSource_id)
            dispatch(getIncomeSourceList());
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const createExpense = createAsyncThunk(
    'create/expense',
    async ({source_id, account_id, amount, comment, time_at}, {rejectedWithValue})=>{
        try {
            const response = await AuthService.createExpense(source_id, account_id, amount, comment, time_at)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)

export const editExpense = createAsyncThunk(
    'edit/expense',
    async ({expense_id, source_id, amount, comment, time_at}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.editExpense(expense_id, source_id, amount, comment, time_at)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const deleteExpense = createAsyncThunk(
    'delete/expense',
    async (expense_id, {dispatch, rejectedWithValue})=>{
        try {
            const response = await AuthService.deleteIncome(expense_id)
            dispatch(getExpenseList());
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const createExpenseSource = createAsyncThunk(
    'create/expenseSource',
    async ({name, comment, ico_id}, {rejectedWithValue})=>{
        try {
            const response = await AuthService.createExpenseSource(name, comment, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const editExpenseSource = createAsyncThunk(
    'edit/expenseSource',
    async ({source_id, name, comment, ico_id}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.editExpenseSource(source_id, name, comment, ico_id)
            return response.data
        }
        catch (error){
            console.log(error.message)
            return rejectedWithValue(error.message)
        }
    }
)
export const deleteExpenseSource = createAsyncThunk(
    'delete/expenseSource',
    async (expenseSource_id, {dispatch, rejectedWithValue})=>{
        try {
            const response = await AuthService.deleteExpenseSource(expenseSource_id)
            dispatch(getIncomeSourceList());
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
export const getExpenseSourceList = createAsyncThunk(
    'get/expenseSourceList',
    async (_,{rejectedWithValue})=>{
        try {
            const response = await AuthService.getExpenseSourcesList()
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
export const getExpenseList = createAsyncThunk(
    'get/expenseList',
    async (_,{rejectedWithValue})=>{
        try {
            const response = await AuthService.getExpenseList()
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
    userExpenses: [],
    userIncomeSource: [],
    userExpenseSource: [],
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
            .addCase(getExpenseSourceList.fulfilled, (state, action) => {
                state.userExpenseSource = action.payload
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
            .addCase(getExpenseList.pending, (state,action)=>{
            })
            .addCase(getExpenseList.fulfilled, (state, action) => {
                state.userExpenses = action.payload
            })
            .addCase(getExpenseList.rejected, (state, action) => {
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
            .addCase(editAccount.fulfilled, (state, action) => {
                const index = state.userAccounts.findIndex(account => account.id === action.payload.id);
                if (index !== -1) {
                    state.userAccounts[index] = action.payload;
                }
            })
            .addCase(editIncome.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })

            .addCase(editIncome.fulfilled, (state, action) => {
                const index = state.userIncomes.findIndex(income => income.id === action.payload.id);
                if (index !== -1) {
                    state.userIncomes[index] = action.payload;
                }
            })
            .addCase(editExpense.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })

            .addCase(editExpense.fulfilled, (state, action) => {
                const index = state.userExpenses.findIndex(expense => expense.id === action.payload.id);
                if (index !== -1) {
                    state.userExpenses[index] = action.payload;
                }
            })
            .addCase(editIncomeSource.fulfilled, (state, action) => {
                const index = state.userIncomeSource.findIndex(income => income.id === action.payload.id);
                if (index !== -1) {
                    state.userIncomeSource[index] = action.payload;
                }
            })
            .addCase(editExpenseSource.fulfilled, (state, action) => {
                const index = state.userExpenseSource.findIndex(expense => expense.id === action.payload.id);
                if (index !== -1) {
                    state.userExpenseSource[index] = action.payload;
                }
            })
            .addCase(editAccount.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.error = action.payload;
                //state.isLoading = false;
            })
            .addCase(createIncome.fulfilled, (state, action) => {
                state.userIncomes.push(action.payload);
            })
            .addCase(createIncome.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createExpense.fulfilled, (state, action) => {
                state.userExpenses.push(action.payload);
            })
            .addCase(createExpense.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(createIncomeSource.fulfilled, (state, action) => {
                state.userIncomeSource.push(action.payload);
            })
            .addCase(createExpenseSource.fulfilled, (state, action) => {
                state.userExpenseSource.push(action.payload);
            })
            .addCase(createIncomeSource.rejected, (state, action) => {
                state.error = action.payload;
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