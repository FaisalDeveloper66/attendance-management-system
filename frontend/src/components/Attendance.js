import React, { useState } from 'react';
import { markAttendance } from '../services/api';

const Attendance = () => {
  const [message, setMessage] = useState('');

  const handleAttendance = async () => {
    try {
      await markAttendance();
      setMessage('Attendance marked successfully!');
    } catch (error) {
      console.error('Attendance error:', error);
      setMessage('Attendance already marked for today.');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <button onClick={handleAttendance}>Mark Attendance</button>
      <p>{message}</p>
    </div>
  );
};

export default Attendance;
