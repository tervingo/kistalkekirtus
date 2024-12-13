import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ExportPdfForm = () => {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.split('?')[1]);
        
        const handleAuthSuccess = async () => {
            try {
                console.log("Auth success detected, initiating PDF export...");
                const response = await fetch('https://kistalkekirtus.onrender.com/api/export-pdf', {
                    credentials: 'include' // Important! Add this to include cookies
                });
                console.log("Received response:", response.status);
                
                const data = await response.json();
                console.log("Response data:", data);
                
                if (data.success && data.link) {
                    window.open(data.link, '_blank');
                    setMessage(t('lex.files.uploadSuccess'));
                } else {
                    throw new Error(data.error || 'Upload failed');
                }
            } catch (error) {
                console.error('Error during PDF export:', error);
                setMessage(t('lex.files.uploadError'));
            }
        };

        if (params.get('auth') === 'success') {
            console.log("Found auth=success in URL");
            handleAuthSuccess();
        }
    }, [t]);


    const initiateDropboxAuth = async () => {
        try {
            console.log("Initiating Dropbox auth...");
            window.location.href = `https://kistalkekirtus.onrender.com/oauth/connect`;
        } catch (error) {
            console.error('Auth error:', error);
            setMessage(t('lex.files.authError'));
        }
    };

    const downloadDictionary = async () => {
        try {
            const response = await fetch('https://kistalkekirtus.onrender.com/api/export-pdf');
            const data = await response.json();
            
            if (data.error === 'Not authenticated with Dropbox') {
                initiateDropboxAuth();
                return;
            }
            
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