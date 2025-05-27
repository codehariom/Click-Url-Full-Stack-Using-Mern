import express from "express"
import { userProfile } from "../controllers/profileControllers.js";
import {authenticateUser } from "../middlewares/validateTokenHandler.js"


const router = express.Router();
// update data from profile 
router.patch("/profile", authenticateUser, userProfile)

export default router;