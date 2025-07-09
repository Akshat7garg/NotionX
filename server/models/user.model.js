import mongoose from "mongoose";
import bcrypt from "bcrypt";

// User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // adds createdAt and updatedAt

// Encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Validate password
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// User model
export const User = mongoose.model('User', userSchema);