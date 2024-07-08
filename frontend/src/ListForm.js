import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { 
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell, 
    Paper, Typography, Checkbox, IconButton, Box
  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

import './tkk.css';

import { SERVER_IP } from './constants';
import theme from './theme';

// LIST ENTRIES

export function ListEntries({ refreshKey, tableContainerRef })  {
    const [translations, setTranslations] = useState([]);
    const [sortField, setSortField] = useState('can');
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAndSortTranslations = async () => {
            const response = await fetch(`${SERVER_IP}/api/list-entries`);
            let data = await response.json();
    
            // Add a 'firstLetter' field to each item in the 'translations' array
            data = data.map((item, index) => ({
                ...item,
                firstLetter: sortField && item[sortField] ? item[sortField][0] : '',
            }));
    
            // Sort the data
            if (sortField !== null) {
                data.sort((a, b) => {
                    if (a[sortField] < b[sortField]) return sortDirection ? -1 : 1;
                    if (a[sortField] > b[sortField]) return sortDirection ? 1 : -1;
                    return 0;
                });
            }
    
            setTranslations(data);
        };
    
        fetchAndSortTranslations();
    }, [refreshKey, refresh, sortField, sortDirection]);


    
    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(!sortDirection);
        } else {
            setSortField(field);
            setSortDirection(true);
        }
    };

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        // Handle the edit action here  
        navigate(`/edit-entry/${can}`);
    };  

    const handleDelete = async (can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) 
        {
            const temp = await fetch(`${SERVER_IP}/api/query-entry?${`can=${can}`}`);
            const temp_data = await temp.json();
            console.log(temp_data);
            const response = await fetch(`${SERVER_IP}/api/delete-entry/${temp_data._id}`, {
                method: 'DELETE',
            });
            if (response) {
                setRefresh(refresh + 1); 
           }
        }
    };

    const handleCopy = (translation) => {
        navigate('/enter-entry', { state: { translation: translation } });
    };

    return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 1 }} >
        <Paper sx={{ my:2, bgcolor: theme.palette.labels.bggreen, color: theme.palette.labels.tx, textAlign: 'center', width:"60%"}} elevation={3}>
          <Typography variant="h4">
          {t('lex.entries.listEntries.pre-header')} ({translations.length} {t('lex.entries.listEntries.post-header')})
          </Typography>
        </Paper>
      </Box>
      <TableContainer 
        component={Paper} 
        ref={tableContainerRef}
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          maxHeight: 'calc(100vh - 100px)', 
          maxWidth: '100%'
          }}
        >
        <Table 
          stickyHeader 
          sx={{ 
            border: 1, 
            borderColor: 'divider',
            minWidth: '100%', // Ensure table takes full width
            width: 'max-content',
            '& .MuiTableCell-root': {
              padding: '6px', // Reduce cell padding
              fontSize: '0.75rem', // Decrease font size
            },
            '& .MuiTableCell-head': {
              backgroundColor: 'background.paper',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            },
          }}
        >
        <TableHead>
          <TableRow>
          {/* {['num', 'iv', 'en', 'cat', 'sw', 'root', 'pl', 'pl2', 'par', 'pul', 'prstem', 'pastem', 'fustem', 'acts'].map((key) => ( */}
          {['num', 'iv', 'en', 'cat', 'sw', 'root', 'pl','prstem', 'acts'].map((key) => (
              <TableCell 
                key={key} 
                onClick={() => ['num', 'iv', 'en', 'cat', 'sw', 'root'].includes(key) ? handleSort(key) : null}
                sx={{
                  cursor: ['num', 'iv', 'en', 'cat', 'sw', 'root'].includes(key) ? 'pointer' : 'default',
                  border: 1,
                  borderColor: 'divider',
                  whiteSpace: 'nowrap'
                }}
              >
                {t(`lex.entries.listEntries.${key}`)}
                {['num', 'iv', 'en', 'cat', 'sw', 'root'].includes(key) && (
                  <UnfoldMoreIcon sx={{ marginLeft: '5px', fontSize: 'small' }} />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {translations.map((translation, index) => (
            <TableRow key={index} id={`entry-${translation.firstLetter}`}>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.num}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.can}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.en}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.cat}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                <Checkbox checked={translation.sw === 1} disabled size="small" />
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                {translation.root 
                  ? <Link href="/list-roots">{translation.root}</Link> 
                  : '<ilkonoi>'
                }
              </TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.pl}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>{translation.pr}</TableCell>
              <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                <IconButton size="small" onClick={() => handleEdit(translation.can)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(translation.can)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => handleCopy(translation)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
    );
}



// LIST ROOTS

export function ListRoots({ refreshKey, tableContainerRef })  {
    const [roots, setRoots] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);
    const { t } = useTranslation();

 
    useEffect(() => {
      const fetchAndSortRoots = async () => {
          const response = await fetch(`${SERVER_IP}/api/list-roots`);
          let data = await response.json();
  
          // Add a 'firstLetter' field to each item in the 'translations' array
          data = data.map((item, index) => ({
              ...item,
              firstLetter: sortField && item[sortField] ? item[sortField][0] : '',
          }));
  
          // Sort the data
          if (sortField !== null) {
              data.sort((a, b) => {
                  if (a[sortField] < b[sortField]) return sortDirection ? -1 : 1;
                  if (a[sortField] > b[sortField]) return sortDirection ? 1 : -1;
                  return 0;
              });
          }
  
          setRoots(data);
      };
  
      fetchAndSortRoots();
    }, [refreshKey, refresh, sortField, sortDirection]);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(!sortDirection);
        } else {
            setSortField(field);
            setSortDirection(true);
        }
    };

    const navigate = useNavigate();

    const handleEdit = async (root) => {
        // Handle the edit action here  
        navigate(`/edit-root/${root}`);
    };  

    const handleDelete = async (root) => {
        if (window.confirm(`Are you sure you want to delete the root ${root}?`)) 
        {
            const temp = await fetch(`${SERVER_IP}/api/query-root?${`root=${root}`}`);
            const temp_data = await temp.json();
            console.log(temp_data);
            const response = await fetch(`${SERVER_IP}/api/delete-root/${temp_data._id}`, {
                method: 'DELETE',
            });
            if (response) {
                setRefresh(refresh + 1); // Increment refresh here
                navigate(`/list-roots`);
            }
        }
    };

    const handleCopy = (root) => {
        navigate('/enter-root', { state: { root: root } });
    };

    return (
        <div>
          <Typography variant="h4">
          {t('lex.entries.listRoots.pre-header')} ({roots.length} {t('lex.entries.listRoots.post-header')})
          </Typography>
          <TableContainer 
            component={Paper} 
            ref={tableContainerRef}
            sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              maxHeight: 'calc(100vh - 100px)', 
              maxWidth: '100%'
              }}
            >
            <Table 
              stickyHeader 
              sx={{ 
                border: 1, 
                borderColor: 'divider',
                minWidth: '100%', // Ensure table takes full width
                width: 'max-content',
                '& .MuiTableCell-root': {
                  padding: '6px', // Reduce cell padding
                  fontSize: '0.75rem', // Decrease font size
                },
                '& .MuiTableCell-head': {
                  backgroundColor: 'background.paper',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                },
              }}
            >
            <TableHead>
              <TableRow>
              {['number', 'root', 'prim', 'moda', 'act', 'modp', 'acts'].map((key) => (
                  <TableCell 
                    key={key} 
                    onClick={() => ['root'].includes(key) ? handleSort(key) : null}
                    sx={{
                      cursor: ['root'].includes(key) ? 'pointer' : 'default',
                      border: 1,
                      borderColor: 'divider',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {t(`lex.entries.listRoots.${key}`)}
                    {['root'].includes(key) && (
                      <UnfoldMoreIcon sx={{ marginLeft: '5px', fontSize: 'small' }} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {roots.map((root, index) => (
                <TableRow key={index} id={`entry-${root.firstLetter}`}>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.number}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.root}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.moda}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.act}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.modp}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>{root.pas}</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'divider' }}>
                    <IconButton size="small" onClick={() => handleEdit(root.root)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(root.root)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleCopy(root)}>
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
}
