import { Note } from '../models/note.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

// Create notes
const createNote = asyncHandler(async (req, res) => {
    const { owner, title, content } = req.body;

    // Validate fields
    if ([owner, title, content].some((field) => (typeof field !== "string" || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Save note
    const newNote = await Note.create({ owner, title, content });

    console.log('Note created successfully!!!');

    return res.status(201).json(
        new ApiResponse(201, newNote, 'Note created successfully!!!')
    );
});

// Fetch notes
const fetchNotes = asyncHandler(async (req, res) => {
    const { owner } = req.body;

    // Validate owner
    if (!owner || typeof owner !== "string" || owner.trim() === "") {
        console.log("Owner's Id is required!!!");
        throw new ApiError(400, "Owner's Id is required!!!");
    }

    // Find notes
    const noteList = await Note.find({ owner });

    const responseMessage = (noteList.length > 0
        ? 'Notes for this owner fetched successfully!!!'
        : 'Notes not found for this owner!!!');

    console.log(responseMessage);

    return res.status(200).json(
        new ApiResponse(200, noteList, responseMessage)
    );
});

// Update notes
const modifyNote = asyncHandler(async (req, res) => {
    const { title, content, _id } = req.body;

    // Validate fields
    if ([_id, title, content].some((field) => (typeof field !== "string" || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Find note
    const isExistNote = await Note.findById(_id);

    if (!isExistNote) {
        console.log("Note does not exits!!!");
        throw new ApiError(404, "Note does not exits!!!");
    }

    // Update note
    const modifiedNote = await Note.findByIdAndUpdate(
        _id,
        { title, content },
        { new: true }
    );

    console.log('Note modified successfully!!!');

    return res.status(201).json(
        new ApiResponse(201, modifiedNote, 'Note modified successfully!!!')
    );
});

// Delete notes
const deleteNote = asyncHandler(async (req, res) => {
    const { _id } = req.query;

    // Validate id
    if (!_id || typeof _id !== "string" || _id.trim() === "") {
        console.log('ID is required!!!');
        throw new ApiError(400, 'Id is required');
    }

    // Find note
    const isExistNote = await Note.findById(_id);

    if (!isExistNote) {
        console.log("Note does not exist!!!");
        throw new ApiError(404, "Note does not exist!!!");
    }

    // Delete note
    const deletedNote = await Note.findByIdAndDelete(_id);

    console.log("Note deleted successfully");

    return res.status(200).json(
        new ApiResponse(200, deletedNote, "Note deleted successfully")
    );
});

export {
    createNote,
    deleteNote,
    fetchNotes,
    modifyNote
};