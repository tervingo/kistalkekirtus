import React, { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const ExportCsvForm = () => {
    const [message, setMessage] = useState('');
    const [dropboxToken, setDropboxToken] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const exportCsv = useCallback(async (token) => {
        try {
            console.log("Making CSV export request with token...");
            const response = await fetch('https://kistalkekirtus.onrender.com/api/export-csv', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("API response status:", response.status);
            const data = await response.json();
            console.log("API response data:", data);
            
            if (data.success) {
                window.open(data.entries_link, '_blank');
                window.open(data.roots_link, '_blank');
                setMessage(t('lex.files.uploadSuccess') + 
                         `\n${t('lex.files.entries')}: ${data.entry_count}` +
                         `\n${t('lex.files.roots')}: ${data.root_count}`);
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(t('lex.files.uploadError'));
        }
    }, [t]);

    const handleExportClick = () => {
        if (dropboxToken) {
            exportCsv(dropboxToken);
        } else {
            console.log("No token, initiating auth...");
            window.location.href = `https://kistalkekirtus.onrender.com/oauth/csv-connect`;  // Updated endpoint
        }
    };

    // Handle Dropbox OAuth callback
    React.useEffect(() => {
        const handleAuth = () => {
            if (window.location.hash.includes('access_token')) {
                const params = new URLSearchParams(window.location.hash.substring(1));
                const token = params.get('access_token');
                if (token) {
                    setDropboxToken(token);
                    exportCsv(token);
                    // Clean the URL without changing the path
                    navigate('/export-csv', { replace: true });
                }
            }
        };

        handleAuth();
    }, [exportCsv, navigate]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mt: 4, p: 3, backgroundColor: theme.palette.primary.dark }}>
                <Typography variant="h4" gutterBottom>
                    {t('lex.files.exportCSV')}
                </Typography>
                
                <Stack spacing={2} sx={{ mt: 2, mb: 2 }}>
                    <Button 
                        variant="contained" 
                        onClick={handleExportClick}
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        {t('lex.files.exportCSV')}
                    </Button>
                </Stack>

                {message && (
                    <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ whiteSpace: 'pre-line' }}
                    >
                        {message}
                    </Typography>
                )}
            </Box>
        </ThemeProvider>
    );
};