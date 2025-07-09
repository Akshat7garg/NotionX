// Redux Toolkit setup
import { configureStore } from "@reduxjs/toolkit";

// Slice reducers
import dialogReducer from "./slices/dialogSlice.js";
import userReducer from './slices/userSlice.js';
import noteReducer from './slices/noteSlice.js';
import todoReducer from './slices/todoSlice.js';

// Configure and export Redux store
export const store = configureStore({
    reducer: {
        dialogs: dialogReducer, // Handles dialog modals
        user: userReducer,      // Handles user authentication & data
        notes: noteReducer,     // Handles note-related state
        todos: todoReducer,     // Handles todo-related state
    }
});
