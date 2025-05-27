import express from "express"
import { getUserPic, uploadPicture } from "../controllers/uploadControllers.js"
import { authenticateUser } from "../middlewares/validateTokenHandler.js";

const router = express.Router()
router.get('/picture', authenticateUser, getUserPic);
router.post('/upload' , authenticateUser, uploadPicture)

export default router;