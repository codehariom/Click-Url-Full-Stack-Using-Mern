import expressAsyncHandler from 'express-async-handler';
import fs from 'fs';
import cloudinary from '../helpers/cloudinary.js';
import { upload } from '../middlewares/uploadFileMiddleware.js';
import { User } from '../models/userModel.js';

// Upload and update user profile picture
export const uploadPicture = [
  upload.single('picture'),
  expressAsyncHandler(async (req, res) => {
    try {
      const { username } = req.user;

      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      console.log(`Uploading file for user ${username}:`, req.file);

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile-pictures',
        transformation: [
          { width: 200, height: 200, crop: 'thumb', gravity: 'face' }
        ]
      });

      // Remove temp file
      fs.unlinkSync(req.file.path);

      // Update user in database
      const user = await User.findOneAndUpdate(
        { username },
        { picture: uploadResult.secure_url },
        { new: true }
      );

      if (!user) {
        console.error(`User not found: ${username}`);
        return res.status(404).json({ error: 'User not found' });
      }

      console.log(`Successfully updated profile picture for ${username}`);
      res.status(200).json({
        message: 'Profile picture updated!',
        picture: user.picture,
      });

    } catch (error) {
      console.error('Error in uploadPicture:', error);
      
      // Clean up temp file if it exists
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      res.status(500).json({ 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }),
];

// Get user's profile picture
export const getUserPic = expressAsyncHandler(async (req, res) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      picture: user.picture || null 
    });

  } catch (error) {
    console.error('Error in getUserPic:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});