import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

//=============================
// EXPORT CSV FILE
//=============================

export const ExportCsvForm = () => {
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        const exportCsv = async () => {
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/export/csv`);
            const data = await response.text();
            setMessage(data);
        };
        exportCsv();
    }, []);

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ mt: 4, backgroundColor: theme.palette.primary.dark }}>
          <Typography variant="h4" gutterBottom>{t('lex.files.exportCSV')}</Typography>
          <Typography variant="h6" gutterBottom>{message}</Typography>
        </Box>
      </ThemeProvider>
    );
};

//=============================
// IMPORT CSV FILE 
//=============================

export function ImportCsvForm() {
    const [message, setMessage] = useState(null);
    const [hasUploaded, setHasUploaded] = useState(false);
    const { t } = useTranslation();

    const handleFileUpload = () => {
      if (window.confirm('Do you want to import the new CSV file?')) {
        fetch(`https://kistalkekirtus.onrender.com/api/import/csv`, {
          method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setMessage(data.message);
          setHasUploaded(true);
        })
        .catch(error => console.error(error));
      }
    };
  
    // Call handleFileUpload when the component is rendered
    useEffect(() => {
      if (!hasUploaded) {
        handleFileUpload();
      }
    }, [hasUploaded]);
  
    return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 4, backgroundColor: theme.palette.primary.dark }}>
        <Typography variant="h4" gutterBottom>{t('lex.files.importCSV')}</Typography>
        { message && <Typography variant="h6" gutterBottom>{message}</Typography> }
      </Box>
    </ThemeProvider>
    );
  };
  
//=================================
// SHOW CSV FILE READ & WRITE INFO
//=================================

  
  export function CsvInfo() {
    const [info, setInfo] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
      fetch(`https://kistalkekirtus.onrender.com/api/csv-info`)
        .then(response => response.json())
        .then(data => setInfo(data));
    }, []);
  
    console.log(info.modified_date)
  
    return (
    <ThemeProvider theme={theme}>
      <Box sx={{ mt: 4, backgroundColor: theme.palette.primary.dark }}>
        <Typography variant="h4" gutterBottom>{t('lex.files.CSVInfo')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h6" gutterBottom>{t('lex.files.modDate')} {info.modified_date}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h6" gutterBottom>{t('lex.files.nofEntries')} {info.num_entries}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h6" gutterBottom>{t('lex.files.rootModDate')} {info.root_modified_date}</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant="h6" gutterBottom>{t('lex.files.nofRoots')} {info.num_roots}</Typography>
        </Box>
        <Typography variant="h6" gutterBottom>{t('lex.files.pre-lastReadCSV')} {info.hostname}{t('lex.files.post-lastReadCSV')}</Typography>
        <Typography paragraph variant="h7" gutterBottom> {info.last_date_info}</Typography>
        <Typography paragraph variant="h7" gutterBottom> {info.last_noe_info}</Typography>
        <Typography paragraph variant="h7" gutterBottom> {info.last_nor_info}</Typography>
      </Box>
    </ThemeProvider>
    );
  }
  