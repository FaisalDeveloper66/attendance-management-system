import React, { useEffect, useState } from 'react';
import { 
  getAttendanceRecords, 
  deleteAttendance, 
  updateAttendance 
} from '../services/api';

const ManageAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const fetchAttendanceRecords = async () => {
            try {
                const response = await getAttendanceRecords();
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance records", error);
            }
        };
        fetchAttendanceRecords();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteAttendance(id);
            setAttendance(attendance.filter(record => record._id !== id));
        } catch (error) {
            console.error("Error deleting attendance record", error);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            await updateAttendance(id, updatedData);
            setAttendance(attendance.map(record => record._id === id ? updatedData : record));
        } catch (error) {
            console.error("Error updating attendance record", error);
        }
    };

    return (
        <div>
            <h2>Manage Attendance</h2>
            <ul>
                {attendance.map(record => (
                    <li key={record._id}>
                        {record.date} - {record.status}
                        <button onClick={() => handleDelete(record._id)}>Delete</button>
                        <button onClick={() => handleUpdate(record._id, { status: 'updated' })}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAttendance;
