import { createSlice } from "@reduxjs/toolkit";

// Initial state for todos
const initialState = {
    todoList: [] // Stores all todos
};

// Slice definition
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {

        // Add a new todo to the top
        addTodo: (state, action) => {
            const { _id, isDone, content } = action.payload;
            const todo = { _id, isDone, content };
            state.todoList.unshift(todo);
        },

        // Update an existing todo
        editTodo: (state, action) => {
            const { _id, isDone, content } = action.payload;
            const todo = state.todoList.find((todo) => todo._id === _id);
            if (todo) {
                todo.isDone = isDone;
                todo.content = content;
            }
        },

        // Remove a todo by ID
        deleteTodo: (state, action) => {
            const { _id } = action.payload;
            state.todoList = state.todoList.filter((todo) => todo._id !== _id);
        },

        // Clear all todos
        clearTodos: (state) => {
            state.todoList = [];
        }
    }
});

// Export actions and reducer
export const { addTodo, editTodo, deleteTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;
