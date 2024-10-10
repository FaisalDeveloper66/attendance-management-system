import React, { useEffect, useState } from 'react';
import { generateReports } from '../services/api';

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await generateReports();
                setReports(response.data);
            } catch (error) {
                console.error("Error generating reports", error);
            }
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h2>Reports</h2>
            <ul>
                {reports.map(report => (
                    <li key={report._id}>
                        {report.user} - {report.attendancePercentage}%
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
