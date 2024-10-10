const express = require('express');
const { registerUser, loginUser, markAttendance, submitLeaveRequest, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/attendance', protect, markAttendance);
router.post('/leave', protect, submitLeaveRequest);
router.get('/profile', protect, getUserProfile);

module.exports = router;
