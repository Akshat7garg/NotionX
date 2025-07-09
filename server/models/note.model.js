import mongoose from "mongoose";

// Note schema
const noteSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }); // adds createdAt and updatedAt

// Note model
export const Note = mongoose.model('Note', noteSchema);