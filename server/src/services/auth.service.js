import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

import ApiError from "../utils/ApiError.js";

// Register User
export const register = async ({ name, email, password }) => {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
       throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);   // Generate JWT

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            targetRole: user.targetRole,
        },
        token,
    };
};

// Login User
export const login = async ({ email, password }) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Compare password

    if (!isMatch) {
         throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            targetRole: user.targetRole,
        },
        token,
    };
};