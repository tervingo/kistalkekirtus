import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
    InputLabel,
  } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import './tkk.css';
import theme from './theme';

// ENTER ENTRY

export function EnterEntry() {

    const location = useLocation();
    const initialTranslation = location.state?.translation || {};

    const [can, setCan] = useState(initialTranslation.can || '');
    const [cat, setCat] = useState(initialTranslation.cat || '');
    const [pl, setPl] = useState(initialTranslation.pl || '');
    const [pl2, setPl2] = useState(initialTranslation.pl2 || '');
    const [par, setPar] = useState(initialTranslation.par || '');
    const [pul, setPul] = useState(initialTranslation.pul || '');
    const [pr, setPr] = useState(initialTranslation.pr || '');
    const [pa, setPa] = useState(initialTranslation.pa || '');
    const [fu, setFu] = useState(initialTranslation.fu || '');
    const [root, setRoot] = useState(initialTranslation.root || '');
    const [en, setEn] = useState(initialTranslation.en || '');
    const [sw, setSw] = useState(initialTranslation.sw || 0);

    const { t } = useTranslation();

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const enterEntry = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://kistalkekirtus.onrender.com/api/enter-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ can, cat, pl, pl2, par, pul, pr, pa, fu, root, en, sw }),
        });
        const data = await response.json();
        console.log(data);
        setMessage('Entry stored successfully!');

        const alkono = await fetch(`https://kistalkekirtus.onrender.com/api/query-root?root=${root}`);
        const kono = await alkono.json();
        console.log('root is: ', kono);
        if (kono == '0') {
            console.log('lets enter a new root');
            navigate(`/enter-root/${root}`);
        }
        else 
        {
            console.log(kono.root);
            handleClear();
            navigate(`/list-entries`);
        }
    };

    const handleClear = () => {
        setCan('');
        setCat('');
        setPl('');
        setPl2('');
        setPar('');
        setPul('');
        setPr('');
        setPa('');
        setFu('');
        setRoot('');
        setEn('');
        setSw(0);
    };

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }

  return (
    <ThemeProvider theme={theme}>
    <Box component="form" onSubmit={enterEntry} sx={{ mt: 4, backgroundColor: theme.palette.primary.dark, p: 3 }}>
      <Typography variant="h4" gutterBottom>{t('lex.entries.enterEntry')}</Typography>
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.iv')}
            value={can}
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
          <TextField
            fullWidth
            label={t('lex.entries.labels.pl')}
            value={pl}
            onChange={(e) => setPl(e.target.value)}
            disabled={!['NO', 'PR'].includes(cat)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.pl2')}
            value={pl2}
            onChange={(e) => setPl2(e.target.value)}
            disabled={!['NO', 'PR'].includes(cat)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.par')}
            value={par}
            onChange={(e) => setPar(e.target.value)}
            disabled={!['NO', 'PR'].includes(cat)}
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

        {/* Second Row */}
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
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label={t('lex.entries.labels.root')}
            value={root}
            onChange={(e) => setRoot(e.target.value)}
          />
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
      </Grid>
      
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
      
      {message && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
    </ThemeProvider> 
  );
}

// ENTER ROOT

export function EnterRoot() {

    const location = useLocation();
    const initialRoot = location.state?.root || {};

    const { root: rootParam } = useParams();
    const [root, setRoot] = useState(rootParam || '');
    const [prim, setPrim] = useState(initialRoot.prim || '');
    const [moda, setModa] = useState(initialRoot.moda || '');
    const [act, setAct] = useState(initialRoot.act || '');
    const [modp, setModp] = useState(initialRoot.modp || '');
    const [pas, setPas] = useState(initialRoot.pas || '');
    const [message, setMessage] = useState('');
    const { t } = useTranslation();

    const navigate = useNavigate();

    const enterRoot = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://kistalkekirtus.onrender.com/api/enter-root`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ root : root, prim, moda, act, modp, pas }),
        });
        const data = await response.json();
        console.log(data);
        setMessage('Entry stored successfully!'); 
        handleClear();
        navigate(`/list-roots`);
    };

    const handleClear = () => {
        setRoot('');
        setPrim('');
        setModa('');
        setAct('');
        setModp('');
        setPas('');
        };

    const handleCancel = async () => {
        navigate(`/list-roots`);
    }

    return (
      <div>
      <ThemeProvider theme={theme}>

      <Box component="form" onSubmit={enterRoot} sx={{ mt: 4, backgroundColor: theme.palette.primary.dark, p: 3 }}>
        <Typography variant="h4" gutterBottom>{t('lex.roots.enterRoot')}</Typography>
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
          {t('buttons.submit')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          {t('buttons.clear')}
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          {t('buttons.cancel')}
        </Button>
      </Box>
      
      {message && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
    </ThemeProvider>
  </div>
  );
}
