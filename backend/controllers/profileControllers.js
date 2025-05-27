import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";


export const userProfile = expressAsyncHandler(async (req, res) => {
  try {
    const { username, profession, name, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await User.findOneAndUpdate(
      {
        $or: [
          { username: username },
          { email: email }
        ]
      },
      {
        username,
        profession,
        name,
        email,
        password: hashedPassword
      },
      {
        new: true
      }
    );

    if (!updateUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: updateUser
    });
    
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


