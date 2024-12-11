import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import {
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Box,
    Container,
  } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import './tkk.css';

// QUERY ENTRY (using MUI)




// QUERY ENTRY

export function QueryEntry() {
    const [search, setSearch] = useState('');
    const [translations, setTranslations] = useState([]);
    const { t } = useTranslation();


 // Main queryEntry function

    const queryEntry = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://kistalkekirtus.onrender.com/api/search-entries?search=${search}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setTranslations(data);
    };

// Edit an entry

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        navigate(`/edit-entry/${can}`);
    };    

// Delete an entry

    const handleDelete = async (id, can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) {
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/delete-entry/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
        }
    };

// Clear form

    const handleClear = () => {
        setSearch('');
        setTranslations([]);
    };

// Cancel

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }


//  Return form 

    return (
    <div>
        <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ backgroundColor: theme.palette.primary.dark, p: 3}}>
            <Typography variant="h4" gutterBottom>
                {t('lex.entries.queryEntries')}
            </Typography>
            <Box component="form" onSubmit={queryEntry} noValidate sx={{ mt: 1 }}>
                <TextField
                fullWidth
                label="Search expression"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                margin="normal"
                />
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" type="submit">
                    {t('buttons.submit')}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClear}>
                    {t('buttons.clear')}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    {t('buttons.cancel')}
                    </Button>
                </Box>
            </Box>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                {t('lex.entries.queryEntries')}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>{t('lex.entries.labels.iv')}</TableCell>
                        <TableCell>{t('lex.entries.labels.en')}</TableCell>
                        <TableCell>{t('lex.entries.labels.cat')}</TableCell>
                        <TableCell>{t('lex.entries.labels.root')}</TableCell>
                        <TableCell>{t('lex.entries.labels.pl')}</TableCell>
                        <TableCell>{t('lex.entries.labels.pl2')}</TableCell>
                        <TableCell>{t('lex.entries.labels.par')}</TableCell>
                        <TableCell>{t('lex.entries.labels.pul')}</TableCell>
                        <TableCell>{t('lex.entries.labels.prstem')}</TableCell>
                        <TableCell>{t('lex.entries.labels.pastem')}</TableCell>
                        <TableCell>{t('lex.entries.labels.fustem')}</TableCell>
                        <TableCell>{t('lex.entries.labels.acts')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(translations) &&
                        translations.map((translation) => (
                            <TableRow key={translation.can}>
                            <TableCell>{translation.can}</TableCell>
                            <TableCell>{translation.en}</TableCell>
                            <TableCell>{translation.cat}</TableCell>
                            <TableCell>{translation.root || t('lex.roots.noroot') }</TableCell>
                            <TableCell>{translation.pl}</TableCell>
                            <TableCell>{translation.pl2}</TableCell>
                            <TableCell>{translation.par}</TableCell>
                            <TableCell>{translation.pul}</TableCell>
                            <TableCell>{translation.pr}</TableCell>
                            <TableCell>{translation.pa}</TableCell>
                            <TableCell>{translation.fu}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleEdit(translation.can)}>
                                <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(translation.can, translation.can)}>
                                <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </ThemeProvider>
    </div>

    );
}

// QUERY ROOT


export function QueryRoot() {
    const [search, setSearch] = useState('');
    const [roots, setRoots] = useState([]);
    const { t } = useTranslation();


 // Main queryEntry function

    const queryRoot = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://kistalkekirtus.onrender.com/api/search-roots?search=${search}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setRoots(data);
    };

// Edit an entry

    const navigate = useNavigate();

    const handleEdit = async (root) => {
        navigate(`/edit-root/${root}`);
    };    

// Delete an entry

    const handleDelete = async (id, root) => {
        if (window.confirm(`Are you sure you want to delete ${root}?`)) {
            const response = await fetch(`https://kistalkekirtus.onrender.com/api/delete-root/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
        }
    };

// Clear form

    const handleClear = () => {
        setSearch('');
        setRoots([]);
    };

// Cancel

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }

//  Return form 

    return (
        <div>
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ backgroundColor: theme.palette.primary.dark, p: 3}}>
                <Typography variant="h4" gutterBottom>
                    {t('lex.roots.queryRoots')}
                </Typography>
                <Box component="form" onSubmit={queryRoot} noValidate sx={{ mt: 1 }}>
                    <TextField
                    fullWidth
                    label="Search expression"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    margin="normal"
                    />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" type="submit">
                        {t('buttons.submit')}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClear}>
                        {t('buttons.clear')}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        {t('buttons.cancel')}
                        </Button>
                    </Box>
                </Box>

                <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                    {t('lex.roots.label')}
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell>{t('lex.roots.root')}</TableCell>
                            <TableCell>{t('lex.roots.prim')}</TableCell>
                            <TableCell>{t('lex.roots.moda')}</TableCell>
                            <TableCell>{t('lex.roots.act')}</TableCell>
                            <TableCell>{t('lex.roots.modp')}</TableCell>
                            <TableCell>{t('lex.roots.pas')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(roots) &&
                            roots.map((root, index) => (
                                <TableRow key={index}>
                                <TableCell>{root.root}</TableCell>
                                <TableCell>{root.prim}</TableCell>
                                <TableCell>{root.moda}</TableCell>
                                <TableCell>{root.act}</TableCell>
                                <TableCell>{root.modp}</TableCell>
                                <TableCell>{root.pas}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => handleEdit(root.root)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(root.root, root.root)}>
                                    <DeleteIcon />
                                </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ThemeProvider>                    
        </div>
    );
}

