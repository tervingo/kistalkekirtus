import React, { useEffect, useState } from 'react';
import { SERVER_IP } from './constants';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ExportPdfForm = () => {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();
    
    useEffect(() => {
        const exportPdf = async () => {
            const response = await fetch(`${SERVER_IP}/api/export/pdf`);
            const data = await response.text();
            setMessage(data);
        };
        exportPdf();
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ mt: 4, backgroundColor: theme.palette.primary.dark }}>
          <Typography variant="h4" gutterBottom>{t('lex.files.exportPDF')}</Typography>
          <Typography variant="h6" gutterBottom>{message}</Typography>
        </Box>
      </ThemeProvider>
    );
};

