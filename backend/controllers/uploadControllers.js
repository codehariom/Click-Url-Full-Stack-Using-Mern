import expressAsyncHandler from 'express-async-handler';
import fs from 'fs';
import cloudinary from '../helpers/cloudinary.js';
import { User } from '../models/userModel.js';

/**
 * Upload and update user profile picture
 */
export const uploadPicture = expressAsyncHandler(async (req, res) => {
  const { username } = req.user;

  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    console.log(`Uploading file for user ${username}:`, req.file);

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile-pictures',
      transformation: [
        { width: 200, height: 200, crop: 'thumb', gravity: 'face' }
      ]
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    // Update user picture in database
    const user = await User.findOneAndUpdate(
      { username },
      { picture: result.secure_url },
      { new: true }
    );

    if (!user) {
      console.error(`User not found: ${username}`);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`Updated picture for user: ${username}`);
    res.status(200).json({
      message: 'Profile picture updated successfully',
      picture: user.picture,
    });

  } catch (error) {
    console.error('Upload error:', error);

    // Delete temp file if exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * Get user profile picture
 */
export const getUserPic = expressAsyncHandler(async (req, res) => {
  const { username } = req.user;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      picture: user.picture || null,
    });

  } catch (error) {
    console.error('Error fetching user picture:', error);

    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});
