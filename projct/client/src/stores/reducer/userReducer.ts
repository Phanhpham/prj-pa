import { addUser, getAllUser, searchUser, updateStatus } from '../../services/admin.service' ;
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Users } from '../../interface/admin';
const userState: Users[] = [];

const userReducer = createSlice({
    name: "users",
    initialState: {
        user: userState
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.user = action.payload;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.user.push(action.payload);
        })
        .addCase(searchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(updateStatus.fulfilled, (state, action: PayloadAction<{ id: number, status: number }>) => {
            const userIndex = state.user.findIndex((user: Users) => user.id === action.payload.id);
            if (userIndex !== -1) {
                state.user[userIndex].status = action.payload.status;
            }
        })
    }
})

export default userReducer.reducer