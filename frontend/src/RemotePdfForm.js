import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ExportPdfForm = () => {
    const [message, setMessage] = useState('');
    const [dropboxToken, setDropboxToken] = useState(null);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check for Dropbox token in URL parameters
        if (location.hash.includes('access_token')) {
            const params = new URLSearchParams(location.hash.substring(1));
            const token = params.get('access_token');
            if (token) {
                setDropboxToken(token);
                // Clean up the URL
                navigate('/export-pdf', { replace: true });
            }
        }
    }, [location, navigate]);

    const initiateDropboxAuth = () => {
        window.location.href = `https://kistalkekirtus.onrender.com/oauth/connect`;
    };

    const downloadDictionary = async () => {
        try {
            if (!dropboxToken) {
                initiateDropboxAuth();
                return;
            }

            const response = await fetch('https://kistalkekirtus.onrender.com/api/export-pdf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${dropboxToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (data.success && data.link) {
                window.open(data.link, '_blank');
                setMessage(t('lex.files.uploadSuccess'));
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage(t('lex.files.uploadError'));
        }
    };

    const downloadRoots = async () => {
        try {
            setMessage(t('lex.files.downloading'));
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/export-roots`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ilven_roots.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setMessage(t('lex.files.downloadComplete'));
        } catch (error) {
            console.error('Error downloading roots PDF:', error);
            setMessage(t('lex.files.downloadError'));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mt: 4, p: 3, backgroundColor: theme.palette.primary.dark }}>
                <Typography variant="h4" gutterBottom>
                    {t('lex.files.exportPDF')}
                </Typography>
                
                <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
                    <Button 
                        variant="contained" 
                        onClick={downloadDictionary}
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        {t('lex.files.downloadDictionary')}
                    </Button>
                    
                    <Button 
                        variant="contained" 
                        onClick={downloadRoots}
                        sx={{ backgroundColor: theme.palette.secondary.main }}
                    >
                        {t('lex.files.downloadRoots')}
                    </Button>
                </Stack>

                {message && (
                    <Typography variant="h6" gutterBottom>
                        {message}
                    </Typography>
                )}
            </Box>
        </ThemeProvider>
    );
};