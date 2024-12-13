import React, { useState, useEffect, useCallback } from 'react';
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

    const downloadDictionary = useCallback(async (token) => {
        try {
            console.log("Making API request with token...");
            const response = await fetch('https://kistalkekirtus.onrender.com/api/export-pdf', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log("API response status:", response.status);
            const data = await response.json();
            console.log("API response data:", data);
            
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
    }, [t]); // Add t as a dependency since it's used inside

    useEffect(() => {
        console.log("Current location hash:", location.hash);
        if (location.hash.includes('access_token')) {
            const params = new URLSearchParams(location.hash.substring(1));
            const token = params.get('access_token');
            console.log("Got token from URL:", token ? "Yes" : "No");
            if (token) {
                setDropboxToken(token);
                // Immediately use the token to download
                downloadDictionary(token);
                navigate('/export-pdf', { replace: true });
            }
        }
    }, [location, navigate, downloadDictionary]); // Added downloadDictionary as a dependency

    const handleDownloadClick = () => {
        if (dropboxToken) {
            downloadDictionary(dropboxToken);
        } else {
            console.log("No token, initiating auth...");
            window.location.href = `https://kistalkekirtus.onrender.com/oauth/connect`;
        }
    };

    const downloadRoots = async () => {
        try {
            setMessage(t('lex.files.downloading'));
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/export/roots-pdf`);
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
                        onClick={handleDownloadClick}
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