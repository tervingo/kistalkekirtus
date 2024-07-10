
import React, { useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './tkk.css';
import { 
    Box, 
    Grid, 
    TextField, 
    Select, 
    MenuItem, 
    Checkbox, 
    FormControlLabel, 
    Button, 
    Typography,
    FormControl,
    InputLabel
  } from '@mui/material';

import { SERVER_IP } from './constants';

// EDIT ENTRIES

export function EditEntry({ setRefreshKey }) {

    const {can} = useParams();
    const [canState, setCan] = useState('');
    const [id, setId] = useState('');
    const [cat, setCat] = useState('');
    const [pl, setPl] = useState('');
    const [pl2, setPl2] = useState('');
    const [par, setPar] = useState('');
    const [pul, setPul] = useState('');
    const [pr, setPr] = useState('');
    const [pa, setPa] = useState('');
    const [fu, setFu] = useState('');
    const [root, setRoot] = useState('');
    const [en, setEn] = useState('');
    const [sw, setSw] = useState(0);
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        console.log(can);
        if (can) {
            const fetchEntry = async () => {
                const response = await fetch(`${SERVER_IP}/api/query-entry?${`can=${can}`}`);
                const data = await response.json();
                setId(data._id);
                setCan(data.can);
                setCat(data.cat);
                setPl(data.pl);
                setPl2(data.pl2);
                setPar(data.par);
                setPul(data.pul);
                setPr(data.pr);
                setPa(data.pa);
                setFu(data.fu);
                setRoot(data.root);
                setEn(data.en);
                setSw(data.sw);
            }
            fetchEntry();
        }
     }, [can]); 
    
    const navigate = useNavigate();
    
    const handleEdit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/edit-entry/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                can: canState,
                cat,
                pl,
                pl2,
                par,
                pul,
                pr,
                pa,
                fu,
                root,
                en,
                sw,
            }),
        });
        
        setMessage("Entry updated successfully");
        setRefreshKey(oldKey => oldKey + 1);
        navigate('/list-entries');
    };

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }
    
    return (
      <Box component="form" onSubmit={handleEdit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>{t('lex.entries.editEntry')}</Typography>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label={t('lex.entries.labels.iv')}
              value={canState}
              onChange={(e) => setCan(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label={t('lex.entries.labels.en')}
              value={en}
              onChange={(e) => setEn(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="cat-select-label">{t('lex.entries.labels.cats.label')}</InputLabel>
            <Select
            labelId="cat-select-label"
            id="cat-select"
            value={cat}
            label={t('lex.entries.labels.cats.label')}
            onChange={(e) => setCat(e.target.value)}
            >
            <MenuItem value="">{t('lex.entries.labels.cats.select')}</MenuItem>
            <MenuItem value="AJ">{t('lex.entries.labels.cats.aj')}</MenuItem>
            <MenuItem value="AV">{t('lex.entries.labels.cats.av')}</MenuItem>
            <MenuItem value="CJ">{t('lex.entries.labels.cats.cj')}</MenuItem>
            <MenuItem value="IJ">{t('lex.entries.labels.cats.ij')}</MenuItem>
            <MenuItem value="NO">{t('lex.entries.labels.cats.no')}</MenuItem>
            <MenuItem value="NU">{t('lex.entries.labels.cats.nu')}</MenuItem>
            <MenuItem value="PF">{t('lex.entries.labels.cats.pf')}</MenuItem>
            <MenuItem value="PR">{t('lex.entries.labels.cats.pr')}</MenuItem>
            <MenuItem value="QT">{t('lex.entries.labels.cats.qt')}</MenuItem>
            <MenuItem value="SF">{t('lex.entries.labels.cats.sf')}</MenuItem>
            <MenuItem value="VB">{t('lex.entries.labels.cats.vb')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>        
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={sw === 1} 
                onChange={(e) => setSw(e.target.checked ? 1 : 0)}
              />
            }
            label={t('lex.entries.labels.sw')}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.root')}
            value={root}
            onChange={(e) => setRoot(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.pl')}
            value={pl}
            onChange={(e) => setPl(e.target.value)}
            disabled={cat !== 'NO'}
          />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.pl2')}
            value={pl2}
            onChange={(e) => setPl2(e.target.value)}
            disabled={cat !== 'NO'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.par')}
            value={par}
            onChange={(e) => setPar(e.target.value)}
            disabled={cat !== 'NO'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.pul')}
            value={pul}
            onChange={(e) => setPul(e.target.value)}
            disabled={cat !== 'VB'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.prstem')}
            value={pr}
            onChange={(e) => setPr(e.target.value)}
            disabled={cat !== 'VB'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.pastem')}
            value={pa}
            onChange={(e) => setPa(e.target.value)}
            disabled={cat !== 'VB'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.fustem')}
            value={fu}
            onChange={(e) => setFu(e.target.value)}
            disabled={cat !== 'VB'}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" type="submit">
          Update
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
      
      {message && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

// EDIT ROOTS


export function EditRoot() {

    const {root} = useParams();
    const [rootState, setRoot] = useState('');
    const [id, setId] = useState('');
    const [prim, setPrim] = useState('');
    const [moda, setModa] = useState('');
    const [act, setAct] = useState('');
    const [modp, setModp] = useState('');
    const [pas, setPas] = useState('');
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    console.log('EditRoot component rendering');

    useEffect(() => {
        console.log('root: ',root);
            const fetchRoot = async () => {
                const url = `${SERVER_IP}/api/query-root?root=${root}`;
                console.log('url: ', url);
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setId(data._id);
                    setRoot(data.root);
                    setPrim(data.prim);
                    setModa(data.moda);
                    setAct(data.act);
                    setModp(data.modp);
                    setPas(data.pas);
                }
                else {
                    console.log('Error with fetch: ', response.status, response.statusText);
                }
            }
            fetchRoot();
     }, []); 
    
    const navigate = useNavigate();
    
    const handleEdit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/edit-root/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                root: rootState,
                prim,
                moda,
                act,
                modp,
                pas,
            }),
        });
        setMessage("Root updated successfully");
        navigate('/list-roots');
    };

    const handleCancel = async () => {
        navigate(`/list-roots`);
    }
    
    return (

    <Box component="form" onSubmit={handleEdit} sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{t('lex.roots.editRoot')}</Typography>
      <Grid container spacing={2}>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.root')}
          value={root}
          onChange={(e) => setRoot(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.prim')}
          value={prim}
          onChange={(e) => setPrim(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.moda')}
          value={moda}
          onChange={(e) => setModa(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.act')}
          value={act}
          onChange={(e) => setAct(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.modp')}
          value={modp}
          onChange={(e) => setModp(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label={t('lex.roots.pas')}
          value={pas}
          onChange={(e) => setPas(e.target.value)}
        />
      </Grid>
    </Grid>
    
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
      <Button variant="contained" color="primary" type="submit">
        Update
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </Box>
    
    {message && (
      <Typography color="primary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    )}
  </Box>


    );
}

