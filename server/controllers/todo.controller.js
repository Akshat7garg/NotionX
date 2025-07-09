import { Todo } from "../models/todo.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// Create todos
const createTodo = asyncHandler(async (req, res) => {
    const { owner, content } = req.body;

    // Validate fields
    if ([owner, content].some((field) => (typeof field !== "string" || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Save todo
    const newTodo = await Todo.create({ owner, content, isDone: false });

    console.log('Todo created successfully!!!');

    return res.status(201).json(
        new ApiResponse(201, newTodo, 'Todo created successfully!!!')
    );
});

// Fetch todos
const fetchTodos = asyncHandler(async (req, res) => {
    const { owner } = req.body;

    // Validate owner
    if (!owner || typeof owner !== "string" || owner.trim() === "") {
        console.log("Owner's Id is required!!!");
        throw new ApiError(400, "Owner's Id is required!!!");
    }

    // Find todos
    const todoList = await Todo.find({ owner });

    const responseMessage = (todoList.length > 0
        ? 'Todos for this owner fetched successfully!!!'
        : 'Todos not found for this owner!!!');

    console.log(responseMessage);

    return res.status(200).json(
        new ApiResponse(200, todoList, responseMessage)
    );
});

// Update todos
const modifyTodo = asyncHandler(async (req, res) => {
    const { isDone, content, _id } = req.body;

    // Validate fields
    if ([_id, content].some((field) => (typeof field !== "string" || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Find todo
    const isExistTodo = await Todo.findById(_id);

    if (!isExistTodo) {
        console.log("Todo does not exits!!!");
        throw new ApiError(404, "Todo does not exits!!!");
    }

    // Update todo
    const modifiedTodo = await Todo.findByIdAndUpdate(
        _id,
        { isDone, content },
        { new: true }
    );

    console.log('Todo modified successfully!!!');

    return res.status(201).json(
        new ApiResponse(201, modifiedTodo, 'Todo modified successfully!!!')
    );
});

// Delete todos
const deleteTodo = asyncHandler(async (req, res) => {
    const { _id } = req.query;

    // Validate id
    if (!_id || typeof _id !== "string" || _id.trim() === "") {
        console.log('ID is required!!!');
        throw new ApiError(400, 'Id is required');
    }

    // Find todo
    const isExistTodo = await Todo.findById(_id);

    if (!isExistTodo) {
        console.log("Todo does not exist!!!");
        throw new ApiError(404, "Todo does not exist!!!");
    }

    // delete todo
    const deletedTodo = await Todo.findByIdAndDelete(_id);

    console.log("Todo deleted successfully");

    return res.status(200).json(
        new ApiResponse(200, deletedTodo, "Todo deleted successfully")
    );
});

export {
    createTodo,
    deleteTodo,
    fetchTodos,
    modifyTodo
};