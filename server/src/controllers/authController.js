const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Name, email, and password are required.",
      data: null,
      error: null,
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        status: 400,
        message: "User already exists. Please login!",
        data: null,
        error: null,
      });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role: "seller",
    });

    res.status(201).json({
      status: 201,
      message: "User registered successfully.",
      data: { role: user.role, userId: user._id },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while registering the user.",
      data: null,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "Email and password are required.",
      data: null,
      error: null,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials.",
        data: null,
        error: null,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials.",
        data: null,
        error: null,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      status: 200,
      message: "Login successful.",
      data: { token, role: user.role, userId: user._id },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while logging in.",
      data: null,
      error: error.message,
    });
  }
};

// Fetch user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Profile fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while fetching the profile",
      data: null,
      error: error.message,
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user info
    const { name, email, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully",
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "An error occurred while updating the profile",
      data: null,
      error: error.message,
    });
  }
};
