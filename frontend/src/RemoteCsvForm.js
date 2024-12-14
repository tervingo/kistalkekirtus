import React, { useState, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

export const ExportCsvForm = () => {
    const [message, setMessage] = useState('');
    const [dropboxToken, setDropboxToken] = useState(null);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const exportCsv = useCallback(async (token) => {
        try {
            console.log("Starting CSV export with token");
            const response = await fetch('https://kistalkekirtus.onrender.com/api/export-csv', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("CSV export response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("CSV export response data:", data);
            
            if (data.success) {
                // Open links in new tabs
                window.open(data.entries_link, '_blank');
                window.open(data.roots_link, '_blank');
                setMessage(`${t('lex.files.uploadSuccess')}\n${t('lex.files.entries')}: ${data.entry_count}\n${t('lex.files.roots')}: ${data.root_count}`);
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('CSV Export Error:', error);
            setMessage(`${t('lex.files.uploadError')}: ${error.message}`);
        }
    }, [t]);

    // Handle Dropbox OAuth callback
    React.useEffect(() => {
        console.log("Current location hash:", location.hash);
        if (location.hash.includes('access_token')) {
            const params = new URLSearchParams(location.hash.substring(1));
            const token = params.get('access_token');
            console.log("Got token from hash:", token ? "Yes" : "No");
            if (token) {
                setDropboxToken(token);
                console.log("About to call exportCsv with token");
                exportCsv(token);
                navigate('/export-csv', { replace: true });
            }
        }
    }, [location, navigate, exportCsv]);

    const handleExportClick = () => {
        console.log("Export button clicked, token exists:", !!dropboxToken);
        if (dropboxToken) {
            exportCsv(dropboxToken);
        } else {
            console.log("Redirecting to Dropbox auth...");
            window.location.href = `https://kistalkekirtus.onrender.com/oauth/csv-connect`;
        }
    };

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