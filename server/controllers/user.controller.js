import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

// Register users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Validate fields
    if ([name, email, password].some((field) => (typeof field !== 'string' || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Check user existence
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
        console.log("User already exits!!!");
        throw new ApiError(409, "User already exits!!!");
    }

    // Create user
    const newUser = await User.create({ name, email, password });

    const createdUser = await User.findById(newUser._id).select("-password");

    if (!createdUser) {
        console.log('Something went wrong, please try again!!!');
        throw new ApiError(500, 'Something went wrong, please try again!!!');
    }

    console.log('User has been created successfully!!!');

    return res.status(201).json(
        new ApiResponse(201, createdUser, 'User has been created successfully!!!')
    );
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate fields
    if ([email, password].some((field) => (typeof field !== 'string' || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Check user existence
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        console.log("User does not exits!!!");
        throw new ApiError(404, "User does not exits!!!");
    }

    // Validate password
    const isMatch = await existedUser.isPasswordMatch(password);

    if (!isMatch) {
        console.log("Invaild password!!!");
        throw new ApiError(401, "Invaild password!!!");
    }

    // Login user
    const userData = await User.findById(existedUser._id).select("-password");

    if (!userData) {
        console.log('Something went wrong, please try again!!!');
        throw new ApiError(500, 'Something went wrong, please try again!!!');
    }

    console.log('User logged in successfully!!!');

    return res.status(200).json(
        new ApiResponse(200, userData, 'User logged in successfully!!!')
    );
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    // Validate fields
    if ([email, newPassword].some((field) => (typeof field !== 'string' || field.trim() === ""))) {
        console.log('All fields are required!!!');
        throw new ApiError(400, 'All fields are required!!!');
    }

    // Check user existence
    const existedUser = await User.findOne({ email });

    if (!existedUser) {
        console.log("Invalid Email Id!!!");
        throw new ApiError(404, "Invalid Email Id!!!");
    }

    // Update password
    existedUser.password = newPassword;
    await existedUser.save();

    console.log("Password changed successfully!!!");

    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully!!!")
    );
});

export {
    changePassword,
    loginUser,
    registerUser
};