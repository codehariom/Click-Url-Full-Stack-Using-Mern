
import express from 'express';
import fs from 'fs';
import cloudinary from '../helpers/cloudinary.js';
import { upload } from '../middlewares/uploadFileMiddleware.js';
import {authenticateUser} from "../middlewares/validateTokenHandler.js"
import {User} from '../models/userModel.js';
import { getUserPic } from '../controllers/profileControllers.js';

const router = express.Router();

router.post('/upload', authenticateUser, upload.single('picture'), async (req, res) => {
  try {

    const username = req.user.username;

   if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }



    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'upload',
    });

    fs.unlinkSync(req.file.path); // delete the local file

    // Update user's picture based on username
    const updatedUser = await User.findOneAndUpdate(
      { username},
      { picture:result.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Picture updated successfully!',
      user: updatedUser,
      url: result.secure_url,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get photo
router.get('/picture', authenticateUser, getUserPic);

export default router;

