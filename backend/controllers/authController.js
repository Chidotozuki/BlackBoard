import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", req.body);

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        details: {
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
        },
      });
    }

    // Find user
    const user = await User.findOne({ email });
    // console.log("User found:", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Prepare user data for response
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const signup = async (req, res) => {
  console.log("Signup request body:", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!password || password.length < 8) {
  return res.status(400).json({ message: "Password must be at least 8 characters long" });
}
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    console.log("Saving user to database:", user);
    await user.save();
    console.log("User saved successfully");

    // Create token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { firstName, lastName, email } = req.body;
//     const userId = req.user.id;

//     // Validate input
//     if (!firstName || !lastName || !email) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if email is already taken by another user
//     const existingUser = await User.findOne({
//       email,
//       _id: { $ne: userId },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already taken" });
//     }

//     // Update user profile
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         firstName,
//         lastName,
//         email,
//       },
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       id: updatedUser._id,
//       firstName: updatedUser.firstName,
//       lastName: updatedUser.lastName,
//       email: updatedUser.email,
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to update profile", error: error.message });
//   }
// };

// export const changePassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const userId = req.user.id;

//     // Validate input
//     if (!currentPassword || !newPassword) {
//       return res
//         .status(400)
//         .json({ message: "Current password and new password are required" });
//     }

//     if (newPassword.length < 8) {
//       return res
//         .status(400)
//         .json({ message: "New password must be at least 8 characters long" });
//     }

//     // Get user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Verify current password
//     const isValidPassword = await user.comparePassword(currentPassword);
//     if (!isValidPassword) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }

//     // Update password
//     user.password = newPassword;
//     await user.save();

//     res.json({ message: "Password changed successfully" });
//   } catch (error) {
//     console.error("Change password error:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to change password", error: error.message });
//   }
// };
