// const userModel = require('../models/UserModel');
// const bcrypt = require('bcrypt');

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

//     const user = await userModel.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: 'Email not found' });

//     const isMatch = bcrypt.compareSync(password, user.password);
//     if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

//     res.status(200).json({ success: true, message: 'Login successful', data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const signup = async (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     req.body.password = bcrypt.hashSync(req.body.password, salt);
//     const user = await userModel.create(req.body);
//     res.status(201).json({ success: true, message: 'User added successfully', data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const user = await userModel.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.status(200).json({ success: true, message: 'User deleted', data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getAllUser = async (req, res) => {
//   try {
//     const users = await userModel.find().populate('roleId', 'name');
//     res.status(200).json({ success: true, message: 'Users fetched', data: users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const getoneUser = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.status(200).json({ success: true, message: 'User fetched', data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });
//     res.status(200).json({ success: true, message: 'User updated', data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// module.exports = { signup, deleteUser, getoneUser, getAllUser, login, updateUser };
const User = require('../models/UserModel');
const SecurityGuard = require('../models/SecurityGuardModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer setup with IPv4 forced
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // h27263012@gmail.com
    pass: process.env.EMAIL_PASS, // trdgbxaodpldevdc
  },
  family: 4, // Force IPv4 to avoid IPv6 resolution issues
});

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      userId: user._id,
      role: user.role,
      fullName: user.fullName,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Login
// const login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       userId: user._id,
//       role: user.role,
//       fullName: user.fullName,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// const login = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

//   try {
//     const { email, password } = req.body;
//     console.log('Login attempt:', { email, password });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     console.log('User found:', { email: user.email, passwordHash: user.password });

//     const isMatch = await user.comparePassword(password);
//     console.log('Password match result:', isMatch);
//     if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token,
//       userId: user._id,
//       role: user.role,
//       fullName: user.fullName,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // Signup
// const signup = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

//   try {
//     const { fullName, email, password, role, PhoneNumber } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

//     const user = new User({ fullName, email, password, role, PhoneNumber });
//     await user.save();

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ success: true, message: 'User added successfully', token, userId: user._id, role: user.role });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
// Login function mein token generation ka code update karo

const login = async (req, res) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { email, password } = req.body;
    console.log("this is login email",email);
    //console.log('Login attempt:', { email, password });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });
    //console.log('User found:', { email: user.email, passwordHash: user.password });

    const isMatch = await user.comparePassword(password);
    //console.log('Password match result:', isMatch);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    let parkingId = null;
    // Check if user is a security guard
    const securityGuard = await SecurityGuard.findOne({ email });
    if (securityGuard) {
       console.log("this is the security Gard mail",securityGuard.email)
      parkingId = securityGuard.parkingId; // Fetch parkingId from SecurityGuard model
      console.log('Security guard detected, parkingId:', parkingId); // Debug
    }

    // Generate token with parkingId only if security guard
    const tokenPayload = { id: user._id, role: user.role };
    if (parkingId) {
      tokenPayload.parkingId = parkingId; // Add parkingId only for security guards
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      userId: user._id,
      role: user.role,
      fullName: user.fullName,
      ...(parkingId && { parkingId }), // Add parkingId in response only for security guards
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Signup mein bhi same update karo
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { fullName, email, password, role, PhoneNumber } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'Email already exists' });

    const user = new User({ fullName, email, password, role, PhoneNumber });
    await user.save();

    // Token expiry ko 7 days karo
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ success: true, message: 'User added successfully', token, userId: user._id, role: user.role });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted', data: user });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: 'Users fetched', data: users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get One User
const getoneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User fetched', data: user });
  } catch (error) {
    console.error('Get one user error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User updated', data: user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`; // Updated to frontend port
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset Request',
      html: `Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 15 minutes.`,
    });

    res.status(200).json({ success: true, message: 'Reset link sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ success: false, message: 'Failed to send reset email', error: error.message });
  }
};

// Reset Password
// const resetPassword = async (req, res) => {
//   const { token, password } = req.body;
//   try {
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ success: true, message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // Step 1: Find user by token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log('Invalid or expired token:', token);
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
    console.log('User found:', { email: user.email, currentHash: user.password });

    // Step 2: Hash new password
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(password, salt);

    // Step 3: Update user directly in database
    const updateResult = await User.updateOne(
      { _id: user._id },
      {
        $set: {
          password: newHash,
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
        },
      }
    );

    if (updateResult.modifiedCount === 0) {
      console.error('Failed to update password:', { userId: user._id });
      return res.status(500).json({ success: false, message: 'Failed to update password' });
    }

    // Step 4: Verify update
    const updatedUser = await User.findById(user._id);
    console.log('Password reset successful:', {
      email: updatedUser.email,
      newHash: updatedUser.password,
    });

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
module.exports = { signup, deleteUser, getoneUser, getAllUser, login, updateUser, forgotPassword, resetPassword, verifyToken };