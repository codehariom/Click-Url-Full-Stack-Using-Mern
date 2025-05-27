import express from "express"
import { getUserPic, uploadPicture } from "../controllers/uploadControllers.js"
import { authenticateUser } from "../middlewares/validateTokenHandler.js";
import { upload } from '../middlewares/uploadFileMiddleware.js';

const router = express.Router()
router.get('/picture', authenticateUser, getUserPic);
router.post('/upload' , authenticateUser, upload.single('picture'),  uploadPicture)

export default router;