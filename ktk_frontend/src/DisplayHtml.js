
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { SERVER_IP } from './constants';
import './tkk.css';

export function HtmlDisplay() {
    const label = useParams();
    const [htmlContent, setHtmlContent] = useState('');
 
    useEffect(() => {
        console.log('label is: ', label.label);
        const fetchData = async () => {
            const response = await fetch(`${SERVER_IP}/api/get_html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grammarKey: label.label })
            });
            const data = await response.text();
            setHtmlContent(data);
        };
        fetchData();
    }, [label]); // Fetch new data when selectedFile changes

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}
