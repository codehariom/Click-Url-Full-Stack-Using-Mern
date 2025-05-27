import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// register user
export const registerUser = expressAsyncHandler(async (req, res) => {
    const username = req.body.username?.trim();
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!username || !email || !name || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        username,
        email,
        name,
        password: hashedPassword,
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
        },
    });
});

// login user
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
        res.status(400);
        throw new Error("Username or email and password are required");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
        return res.status(403).json({ message: "No users registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid email/username or password");
    }

    const accessToken = jwt.sign(
        {
            username: user.username,
            email: user.email,
            id: user._id,
        },
        process.env.JWT_Secret,
        { expiresIn: "7d" }
    );

    return res.status(200).json({ accessToken });
});

// user profile
export const userProfile = (req, res) => {
    res.json({
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
    });
};

// logout user
export const logoutUser = (req, res) => {
    res.json({ message: "Logged out successfully" });
};
