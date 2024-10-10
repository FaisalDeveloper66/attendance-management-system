import React, { useState, useEffect } from 'react';
import { getLeaveRequests, approveLeave, rejectLeave } from '../services/api';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await getLeaveRequests();
        setLeaveRequests(data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      setLeaveRequests(leaveRequests.map(request => request._id === id ? { ...request, status: 'approved' } : request));
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      setLeaveRequests(leaveRequests.map(request => request._id === id ? { ...request, status: 'rejected' } : request));
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaveRequests.map(request => (
          <li key={request._id}>
            {request.user.name} - {request.reason} - {request.status}
            <button onClick={() => handleApprove(request._id)}>Approve</button>
            <button onClick={() => handleReject(request._id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
