import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService.js";

export const createAccount = createAsyncThunk(
    'create/account',
    async ({name, comment, currency, value, ico_id}, {getState , dispatch,rejectedWithValue})=>{
        try {
            const response = await AuthService.createAccount(name, comment, currency, value, ico_id)
            //dispatch(setUserAccounts(response.data));
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

const initialState ={
    isLogged: false,
    isLoading: true,
    userData: null,
    userAccounts: [],
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
        }
    },
    extraReducers:(builder)=> {
        builder
      //  [checkAuth.pending]: (state, action) => {
      //  },
      //  [checkAuth.rejected]: (state, action) => {
      //  },
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
           // state.isLoading = true;
            })
            .addCase(getAccountList.fulfilled, (state, action) => {
              //  state.isLoading = false;
                state.userAccounts = action.payload
                console.log('userAccounts Slice test',action)
            })
            .addCase(getAccountList.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
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
            });
    },
})

export const {setUserData,setUserAccounts } = userSlice.actions
export default userSlice.reducer