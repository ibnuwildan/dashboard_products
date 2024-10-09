import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Thunk untuk login user
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkApi) => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        });
        return response.data; // Pastikan response benar-benar data user
    } catch (error) {
        console.error('Error logging in:', error); // Tambahkan log ini
        if (error.response) {
            const message = error.response.data.msg || "Login failed";
            console.log('Error message:', message); // Tambahkan log ini
            return thunkApi.rejectWithValue(message);
        }
        return thunkApi.rejectWithValue("Terjadi kesalahan pada server");
    }
});

export const getMe = createAsyncThunk("user/getMe", async (_, thunkApi) => {
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data; 
    } catch (error) {
        console.error('Error logging in:', error); // Tambahkan log ini
        if (error.response) {
            const message = error.response.data.msg || "Login failed";
            console.log('Error message:', message); // Tambahkan log ini
            return thunkApi.rejectWithValue(message);
        }
        return thunkApi.rejectWithValue("Terjadi kesalahan pada server");
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
          await axios.delete('http://localhost:5000/logout');
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload; // Set message dari action.payload
        });
        // get user Login
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload; // Set message dari action.payload
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

