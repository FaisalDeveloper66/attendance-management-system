const User = require('../models/User');
const Attendance = require('../models/Attendance');
const LeaveRequest = require('../models/LeaveRequest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, profilePicture } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profilePicture,
  });

  if (user) {
    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Mark Attendance
const markAttendance = async (req, res) => {
  const existingAttendance = await Attendance.findOne({ user: req.user._id, date: new Date().setHours(0, 0, 0, 0) });
  
  if (existingAttendance) {
    return res.status(400).json({ message: 'Attendance already marked for today' });
  }

  const attendance = await Attendance.create({ user: req.user._id });
  res.status(201).json(attendance);
};

// Submit Leave Request
const submitLeaveRequest = async (req, res) => {
  const { reason } = req.body;
  const leaveRequest = await LeaveRequest.create({ user: req.user._id, reason });
  res.status(201).json(leaveRequest);
};

// Get User Profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user);
};

module.exports = { registerUser, loginUser, markAttendance, submitLeaveRequest, getUserProfile };
