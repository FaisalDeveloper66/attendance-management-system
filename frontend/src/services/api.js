import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Your backend URL

// Get Leave Requests
export const getLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/leaves`);
    return response.data;
  } catch (error) {
    console.error("Error fetching leave requests:", error);
  }
};

// Approve Leave Request
export const approveLeave = async (leaveId) => {
  try {
    const response = await axios.patch(`${API_URL}/admin/leaves/approve/${leaveId}`);
    return response.data;
  } catch (error) {
    console.error("Error approving leave request:", error);
  }
};

// Reject Leave Request
export const rejectLeave = async (leaveId) => {
  try {
    const response = await axios.patch(`${API_URL}/admin/leaves/reject/${leaveId}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting leave request:", error);
  }
};

// Get Attendance Records
export const getAttendanceRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/attendance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance records:", error);
  }
};

// Delete Attendance Record
export const deleteAttendance = async (attendanceId) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/attendance/${attendanceId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting attendance record:", error);
  }
};

// Update Attendance Record
export const updateAttendance = async (attendanceId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/admin/attendance/${attendanceId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating attendance record:", error);
  }
};

// Generate Reports
export const generateReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/reports`);
    return response.data;
  } catch (error) {
    console.error("Error generating reports:", error);
  }
};
