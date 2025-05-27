import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    original_url:{
        type:String,
        require:true,
    },
    short_url:{
        type:String,
        require:true,
        unique:true
    },
    click:{
        type:Number,
        require:true,
        default:0
    }

},{
    timestamps:{
        createdAt:true,
        updatedAt:true
    }
})

export const Url  =  mongoose.model("url",userModel)