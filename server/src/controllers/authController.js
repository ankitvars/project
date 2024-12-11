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
