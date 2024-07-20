
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { SERVER_IP } from './constants';
import './tkk.css';

export function HtmlDisplay() {
    const { t } = useTranslation();
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
            let data = await response.text();

       // Replace placeholders with translations
            data = data.replace(/{{(.+?)}}/g, (match, key) => t(key));
            console.log('data is: ', data);

            setHtmlContent(data);
        };
        fetchData();
    }, [label, t]); // Fetch new data when selectedFile changes

    return (
        <div style={{ backgroundColor: 'dimgrey', padding: '0 0 0 40px' }}>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    );
}
