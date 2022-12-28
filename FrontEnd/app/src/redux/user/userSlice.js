import {createSlice, current} from "@reduxjs/toolkit";
import {login, register} from "../../services/userService";


const initialState = {
    currentUser: {
        username: localStorage.getItem('username')
    }
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            console.log(action.payload)
            state.currentUser = action.payload.data
            localStorage.setItem("username", action.payload.data.userName)
        });
        builder.addCase(register.fulfilled, (state, action) => {
            // console.log(action.payload, 're')
            state.currentUser = action.payload
            // console.log(action, 'register')
        })
    }
})
export default userSlice.reducer