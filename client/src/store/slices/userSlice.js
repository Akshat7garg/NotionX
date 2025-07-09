import { createSlice } from "@reduxjs/toolkit";

// Initial state for user authentication
const initialState = {
    isLogged: false,    // Tracks login status
    userData: null      // Stores user info
};

// Slice definition
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        // Handle user login
        loginUser: (state, action) => {
            if (action.payload) {
                state.isLogged = true;
                state.userData = action.payload;
            }
        },

        // Handle user logout
        logoutUser: (state) => {
            state.isLogged = false;
            state.userData = null;
        }
    }
});

// Export actions and reducer
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
