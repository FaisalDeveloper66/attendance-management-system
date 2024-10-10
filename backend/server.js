import React, { useEffect, useState } from 'react';
import { 
  getLeaveRequests, 
  approveLeave, 
  rejectLeave 
} from '../services/api';

const LeaveRequests = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await getLeaveRequests();
                setLeaves(response.data);
            } catch (error) {
                console.error("Error fetching leave requests", error);
            }
        };
        fetchLeaveRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            await approveLeave(id);
            setLeaves(leaves.filter(leave => leave._id !== id));
        } catch (error) {
            console.error("Error approving leave", error);
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectLeave(id);
            setLeaves(leaves.filter(leave => leave._id !== id));
        } catch (error) {
            console.error("Error rejecting leave", error);
        }
    };

    return (
        <div>
            <h2>Leave Requests</h2>
            <ul>
                {leaves.map(leave => (
                    <li key={leave._id}>
                        {leave.reason} - {leave.status}
                        <button onClick={() => handleApprove(leave._id)}>Approve</button>
                        <button onClick={() => handleReject(leave._id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaveRequests;
