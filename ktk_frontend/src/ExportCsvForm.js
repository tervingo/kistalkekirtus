import React, { useEffect, useState } from 'react';
import { SERVER_IP } from './constants';

export const ExportCsvForm = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const exportCsv = async () => {
            const response = await fetch(`${SERVER_IP}/api/export/csv`);
            const data = await response.text();
            setMessage(data);
        };
        exportCsv();
    }, []);

    return (
        <div>
            <h2>Export CSV</h2>
            <p>{message}</p>
        </div>
    );
};

