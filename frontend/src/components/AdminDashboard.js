import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/admin/manage-attendance">Manage Attendance</Link></li>
        <li><Link to="/admin/leave-requests">Approve Leave Requests</Link></li>
        <li><Link to="/admin/reports">Generate Reports</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
