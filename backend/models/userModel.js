import mongoose from "mongoose";

const userModel = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            require: true,
            trim:true
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },

        confirmPassword: {
            type: String,
            require: true,
        },

        profession:{
            type:String,
            default:null
        },

        picture: {
            type: String,
        },
    },
    {
        timestamps: {
            updatedAt: true,
            createdAt: true,
        },
    }
);

export const User = mongoose.model("User", userModel);
