import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../features/auth/types";

interface UserState {
    isLoggedIn: boolean;
    token: string;
    user: User | null;
}

const initialState: UserState = {
    isLoggedIn: false,
    token: '',
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setLoggedInOut(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        }
    }
});

export const { setCurrentUser, setLoggedInOut, setToken } = userSlice.actions;
export default userSlice.reducer;