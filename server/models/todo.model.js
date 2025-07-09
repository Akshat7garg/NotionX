import mongoose from "mongoose";

// Todo schema
const todoSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // adds createdAt and updatedAt

// Todo model
export const Todo = mongoose.model('Todo', todoSchema);