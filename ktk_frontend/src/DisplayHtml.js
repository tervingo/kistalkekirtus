import React, { useEffect, useState } from 'react';

import { SERVER_IP } from './constants';

export function HtmlDisplay() {
    const [htmlContent, setHtmlContent] = useState('');
    const grammarKey = 'NOM_DECLENSION';

    console.log('Entering HtmlDisplay');

    useEffect(() => {
        console.log(grammarKey);
        const fetchData = async () => {
            const response = await fetch(`${SERVER_IP}/api/get_html`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ grammarKey: grammarKey })
            });
            const data = await response.text();
            setHtmlContent(data);
        };
        fetchData();
    }, [grammarKey]);

    console.log('htmlContent:', htmlContent);

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}