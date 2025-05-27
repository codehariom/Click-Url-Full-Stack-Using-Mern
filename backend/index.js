import express from "express";
import connectDb from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";


// express app 
const app = express();

// config .env
dotenv.config();

// config cors
app.use(cors({
    origin:process.env.corsOrigin
}));

const port = process.env.PORT || 8001;

// Connecting database
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});

app.use(express.json({limit:"200kb"}));
app.use(express.urlencoded({extended:true, limit:"200kb"}))


// route
import userRoute from "../backend/routes/userRoutes.js"
import clickUrlRoute from "../backend/routes/clickUrlRoutes.js"
import uploadRoute from "../backend/routes/uploadRoutes.js"
import profileRoutes from '../backend/routes/profileRoutes.js'



// routes api 
app.use("/api/user", userRoute);
app.use("", clickUrlRoute);
app.use("/pic",uploadRoute);
app.use("/api/update",profileRoutes);
