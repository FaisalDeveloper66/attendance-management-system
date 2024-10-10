const LeaveRequest = require('../models/LeaveRequest'); // Assuming you have this model
const Attendance = require('../models/Attendance'); // Assuming you have this model
const Report = require('../models/Report'); // Assuming you have this model

// Fetch all leave requests
exports.getLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.find();
        res.status(200).json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch leave requests', error });
    }
};

// Approve a leave request
exports.approveLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leaveRequest = await LeaveRequest.findByIdAndUpdate(leaveId, { status: 'approved' }, { new: true });
        res.status(200).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to approve leave request', error });
    }
};

// Reject a leave request
exports.rejectLeave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leaveRequest = await LeaveRequest.findByIdAndUpdate(leaveId, { status: 'rejected' }, { new: true });
        res.status(200).json(leaveRequest);
    } catch (error) {
        res.status(500).json({ message: 'Failed to reject leave request', error });
    }
};

// Fetch all attendance records
exports.getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find();
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance records', error });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const attendanceId = req.params.id;
        await Attendance.findByIdAndDelete(attendanceId);
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete attendance record', error });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const updatedData = req.body;
        const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, updatedData, { new: true });
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update attendance record', error });
    }
};

// Generate attendance reports
exports.generateReports = async (req, res) => {
    try {
        const reports = await Report.find(); // Assuming Report model exists for this
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate reports', error });
    }
};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Admin login controller
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

module.exports = { loginAdmin };
