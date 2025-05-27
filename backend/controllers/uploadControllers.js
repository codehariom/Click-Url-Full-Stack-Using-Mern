import expressAsyncHandler from 'express-async-handler';
import fs from 'fs';
import cloudinary from '../helpers/cloudinary.js';
import { upload } from '../middlewares/uploadFileMiddleware.js';
import { User } from '../models/userModel.js';

// Upload and update user profile picture
export const uploadPicture = [
  upload.single('picture'), // multer middleware runs first
  expressAsyncHandler(async (req, res) => {
    const { username } = req.user;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'upload',
    });

    fs.unlinkSync(req.file.path); // Remove temp file

    const user = await User.findOneAndUpdate(
      { username },
      { picture: uploadResult.secure_url },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile picture updated!',
      picture: user.picture,
    });
  }),
];



// Get user's profile picture
export const getUserPic = expressAsyncHandler(async (req, res) => {
  const { username } = req.user;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ picture: user.picture });
});
