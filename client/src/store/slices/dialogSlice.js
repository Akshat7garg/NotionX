// Redux slice for managing dialog modals
import { createSlice } from "@reduxjs/toolkit";

// Initial state for dialog visibility
const initialState = {
    login: false,
    register: false,
    changePassword: false,
    dataLoading: false
};

// Slice definition
const dialogSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        // Open a specific dialog
        openDialog: (state, action) => {
            const dialogName = action.payload;
            if (state.hasOwnProperty(dialogName)) {
                state[dialogName] = true;
            }
        },
        // Close a specific dialog
        closeDialog: (state, action) => {
            const dialogName = action.payload;
            if (state.hasOwnProperty(dialogName)) {
                state[dialogName] = false;
            }
        }
    }
});

// Export actions and reducer
export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
