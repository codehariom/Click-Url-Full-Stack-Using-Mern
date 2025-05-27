import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import fs from 'fs'

// cloudinary config 

dotenv.config();

cloudinary.config({
    cloud_name: process.env.Cloudinary_Name,
    api_key: process.env.Cloudinary_API_Key,
    api_secret: process.env.Cloudinary_API_Secret,
});



export const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"image"
        
        })
        console.log("File is upload Sucessfully", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the uplode opration got faild
        console.log("error in file uploding",error)
        return null 
    }
}
export default cloudinary;