import {createSlice, current} from "@reduxjs/toolkit";
import {login, register} from "../../services/userService";


const initialState = {
    currentUser: {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('token')
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
            localStorage.setItem("userName", action.payload.userName)
            localStorage.setItem("token",action.payload.token)
        });
        builder.addCase(register.fulfilled, (state, action) => {
            // console.log(action.payload, 're')
            // console.log(action,'act')
            state.currentUser = action.payload
            // console.log(action, 'register')
        })
    }
})
export default userSlice.reducer