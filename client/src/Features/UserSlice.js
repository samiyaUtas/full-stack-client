import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user login
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("https://fullstack-server-1.onrender.com/login", {
      remail: userData.email,
      rpassword: userData.password, 
    });
    console.log(response);
    return response.data.User;
  } catch (error) {
    alert("Invalid Credentials...");
  }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      console.log(userData);
      const response = await axios.post("https://fullstack-server-1.onrender.com/registerUser", {
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
      });
      const user = response.data.user; //retrieve the response from the server
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

const initVal = {
  user: {}, // Store user data after successful login
  isSuccess: false, // Indicate if the action is successful
  isError: false, // Indicate if the action encountered an error
  isLoading: false, // Indicate if the action is loading
};

export const userSlice = createSlice({
  name: "users",
  initialState: initVal,
  reducers: {
    // Add any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
