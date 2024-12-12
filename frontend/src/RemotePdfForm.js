import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ExportPdfForm = () => {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
/* 
    const downloadDictionary = async () => {
        try {
            setMessage(t('lex.files.downloading'));
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/export/dictionary-pdf`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ilven_dictionary.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setMessage(t('lex.files.downloadComplete'));
        } catch (error) {
            console.error('Error downloading dictionary PDF:', error);
            setMessage(t('lex.files.downloadError'));
        }
    };
 */
    const downloadDictionary = async () => {
        try {
            setMessage(t('lex.files.uploading')); // Add loading message
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/export/dictionary-pdf`);
            const data = await response.json();
            
            console.log('Response from server:', data); // Debug log
            
            if (data.success && data.link) {
                setMessage(t('lex.files.uploadSuccess'));
                window.open(data.link, '_blank');
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Full error:', error);
            setMessage(t('lex.files.uploadError') + ': ' + error.message);
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