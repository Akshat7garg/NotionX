import { createSlice } from "@reduxjs/toolkit";

// Initial state for notes
const initialState = {
    noteList: [] // Stores all notes
};

// Slice definition
const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {

        // Add a new note to the top
        addNote: (state, action) => {
            const { _id, title, content } = action.payload;
            const note = { _id, title, content };
            state.noteList.unshift(note);
        },

        // Update an existing note
        editNote: (state, action) => {
            const { _id, title, content } = action.payload;
            const note = state.noteList.find((note) => note._id === _id);
            if (note) {
                note.title = title;
                note.content = content;
            }
        },

        // Remove a note by ID
        deleteNote: (state, action) => {
            const { _id } = action.payload;
            state.noteList = state.noteList.filter((note) => note._id !== _id);
        },

        // Clear all notes
        clearNotes: (state) => {
            state.noteList = [];
        }
    }
});

// Export actions and reducer
export const { addNote, editNote, deleteNote, clearNotes } = noteSlice.actions;
export default noteSlice.reducer;
