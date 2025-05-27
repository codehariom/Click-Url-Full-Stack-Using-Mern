import mongoose from "mongoose";
import {db_name} from "../Constant.js";


const connectDb = async() =>{
    try{
        const connection = await mongoose.connect(`${process.env.mongodb_url}/${db_name}`);
        console.log(`\n database connected! db host : ${connection.connection.host}`);
    } catch (error){;
        console.log("database not connetced" ,error);
        process.exit(1);
    }
}

export default connectDb;