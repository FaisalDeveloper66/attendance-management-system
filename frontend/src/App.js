import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ManageAttendance from './components/ManageAttendance';
import LeaveRequests from './components/LeaveRequests';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-attendance" element={<ManageAttendance />} />
        <Route path="/admin/leave-requests" element={<LeaveRequests />} />
        <Route path="/admin/reports" element={<Reports />} />
        
        {/* Add other user routes here */}
      </Routes>
    </Router>
  );
}

export default App;
