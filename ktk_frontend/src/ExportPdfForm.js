import React, { useEffect, useState } from 'react';
import { SERVER_IP } from './constants';


export const ExportPdfForm = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const exportPdf = async () => {
            const response = await fetch(`${SERVER_IP}/api/export/pdf`);
            const data = await response.text();
            setMessage(data);
        };
        exportPdf();
    }, []);

    return (
        <div>
            <h2>Export PDF</h2>
            <p>{message}</p>
        </div>
    );
};

