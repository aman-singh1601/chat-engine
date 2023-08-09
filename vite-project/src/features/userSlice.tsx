import {createSlice} from '@reduxjs/toolkit'

const initialState={
    authData:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        authSignin:(state,action)=>{
           localStorage.setItem('profile',JSON.stringify({...action?.payload}))
           state.authData=action?.payload
        },
        authLogout:(state,action)=>{
            localStorage.clear();
            state.authData=null;
        }
    }
})


export default authSlice.reducer
export const {authSignin,authLogout}=authSlice.actions