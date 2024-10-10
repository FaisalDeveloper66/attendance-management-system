import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/attendance">Mark Attendance</Link></li>
        <li><Link to="/leave">Submit Leave Request</Link></li>
        <li><Link to="/profile">View Profile</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;
