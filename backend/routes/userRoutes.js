import express from "express";
import { logoutUser, loginUser, registerUser, userProfile} from "../controllers/authContollers.js";
import {authenticateUser } from "../middlewares/validateTokenHandler.js"

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/profile",authenticateUser,userProfile);


export default router;