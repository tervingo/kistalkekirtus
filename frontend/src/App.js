import React, { useState, useEffect, useRef  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Box, Paper, Typography } from '@mui/material';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from './theme';

import './tkk.css';
import './grammar.css';
import './i18n';

import { EnterEntry, EnterRoot } from './EnterForm';
import { QueryEntry, QueryRoot } from './QueryForm';
import { ListEntries, ListRoots } from './ListForm';
import { EditEntry, EditRoot } from './EditForm';
import { ExportCsvForm, ImportCsvForm, CsvInfo } from './CsvForm';
import { ExportPdfForm } from './RemotePdfForm';
import { HtmlDisplay } from './DisplayHtml';
import { LexTreeView } from './LexTreeView';
import { GramTreeView } from './GramTreeView';
import { LetterTable } from './LetterTable'; 


// Custom styled ToggleButton
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.MuiToggleButton-root': {
    textTransform: 'none',
    minWidth: '40px',
    padding: '5px 10px',
    backgroundColor: theme.palette.toggle.off,
    border: `1px solid ${theme.palette.primary.main}`,
    '&.Mui-selected': {
      backgroundColor: theme.palette.toggle.on,
      color: theme.palette.primary.contrastText,
    },
  },
}));


function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = React.useCallback((event, newLanguage) => {
    if (newLanguage !== null) {
      i18n.changeLanguage(newLanguage);
    }
  }, [i18n]); // Add i18n as a dependency

  // Set default language to English on component mount
  useEffect(() => {
    changeLanguage(null, 'en');
  }, [changeLanguage]); // Add changeLanguage as a dependency

  return (
    <div className='language-switcher'>
      <ToggleButtonGroup
        value={i18n.language}
        exclusive
        onChange={changeLanguage}
        aria-label="language switcher"
      >
        <StyledToggleButton value="en" aria-label="English">
          EN
        </StyledToggleButton>
        <StyledToggleButton value="iv" aria-label="Ivrit">
          IV
        </StyledToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}


function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [activeTab, setActiveTab] = useState('LEXICON');
    const [lexNavigateOnMount, setLexNavigateOnMount] = useState(true);
    const [gramNavigateOnMount, setGramNavigateOnMount] = useState(false);
    const { t } = useTranslation();
    const hostname = window.location.hostname;
    const tableContainerRef = useRef(null);

   // Create a navigation component
   function NavigationHandler() {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isFirstRender) {
            navigate('/list-entries');
            setIsFirstRender(false);
        }
    }, [navigate]);

    return null;
}



/* 
    function MainComponent() {

        return (
            <div className="main">
                <Routes>
                    <Route path="/enter-entry" element={<EnterEntry />} />
                    <Route path="/query-entry" element={<QueryEntry />} />
                    <Route path="/list-entries" element={<ListEntries refreshKey={refreshKey} tableContainerRef={tableContainerRef} />} />
                    <Route path="/edit-entry/:can" element={<EditEntry setRefreshKey={setRefreshKey} />} />
                    <Route path="/list-roots" element={< ListRoots refreshKey={refreshKey} tableContainerRef={tableContainerRef} />} />
                    <Route path="/edit-root/:root" element={< EditRoot />} />
                    <Route path="/enter-root" element={< EnterRoot />} />
                    <Route path="/enter-root/:root" element={< EnterRoot />} />
                    <Route path="/query-root" element={< QueryRoot />} />
                    <Route path="/export/csv" element={<ExportCsvForm />} />
                    <Route path="/export/pdf" element={<ExportPdfForm />} />
                    <Route path="/import/csv" element={<ImportCsvForm />} />
                    <Route path="/csv-info" element={<CsvInfo />} />
                    <Route path="/html-display/:label" element={<HtmlDisplay />} />
                </Routes>
            </div>
        );
    } */

    // const tableContainerRef = useRef(null);

    function handleLetterClick(letter) {
      console.log('letter :', letter);
      const element = document.getElementById(`entry-${letter}`);
      console.log('element: ', element);
      if (element && tableContainerRef.current) {
        tableContainerRef.current.scrollTop = element.offsetTop - tableContainerRef.current.offsetTop;
      }
    }
    
    function handleScrollToTop() {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop = 0;
      }
    }
    
    function handleScrollToBottom() {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
      }
    }
    
    const handleTabChange = (event, newTab) => {
      setActiveTab(newTab);
      if (newTab === 'LEXICON') 
      {
        setLexNavigateOnMount(true);
        setGramNavigateOnMount(false);
      } else if (newTab === 'GRAMMAR') 
      {
        setGramNavigateOnMount(true);
        setLexNavigateOnMount(false);
      }
    };


    return (
    <Router>
      <Container maxWidth="xl" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavigationHandler />  {/* Add the navigation handler here */}
        <Grid container sx={{ height: '100%', flexGrow: 1, overflow:'hidden' }}>

          {/* Top Panel */}
          <Grid item xs={12}>
            <Box justifyContent="center" alignItems="center" sx={{ p: 2, backgroundColor: 'primary.main' }}>            
                <LanguageSwitcher />
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 2 }} >
                  <Paper sx={{ my:3, bgcolor: theme.palette.labels.bgblue, color: theme.palette.labels.tx, textAlign: 'center', width:"60%"}} elevation={3}>
                    <Typography variant="h3">
                      {t('title')}
                    </Typography>
                  </Paper>
                </Box>
                <Box sx={{ p:1, textAlign: 'center'}} >
                  <img src=".\kantokirtur_3.png" alt="Kantokirtur" />
                  <Typography sx={{ fontFamily: '"Kirmius Ilren", sans-serif', fontSize: '2rem', fontWeight: 600}}>
                    ilven.talkummur.<br/>le.kistalkejonsjur
                  </Typography>
                </Box>
            </Box>
          </Grid>
          
          {/* Left Panel */}
          <Grid item xs={3} sx={{ height: '100%', overflow: 'auto', borderRight: 1, borderColor: 'divider' }}>
              <Box sx={{ p: 2, backgroundColor: 'primary.main' }}>
                <h3 className="hostname">{hostname}</h3>
                <div className="tabs">
                    <ToggleButtonGroup
                      value={activeTab}
                      exclusive
                      onChange={handleTabChange}
                      aria-label="text alignment"
                      size="small"
                    >
                    <StyledToggleButton
                      value="LEXICON" 
                      aria-label="lexicon"
                      >
                      {t('tabs.lexicon')}
                    </StyledToggleButton>
                    <StyledToggleButton
                      value="GRAMMAR" 
                      aria-label="grammar"
                    >
                      {t('tabs.grammar')}
                    </StyledToggleButton>
                  </ToggleButtonGroup>
                </div>
                {activeTab === 'LEXICON' && (
                    <>        
                        <LexTreeView LexNavigateOnMount={lexNavigateOnMount} setLexNavigateOnMount={setLexNavigateOnMount} />
                        <LetterTable handleLetterClick={handleLetterClick} handleScrollToTop={handleScrollToTop} handleScrollToBottom={handleScrollToBottom}/>                       
                    </>
                    )}
                {activeTab === 'GRAMMAR' && (
                    <>
                        <GramTreeView GramNavigateOnMount={gramNavigateOnMount} setGramNavigateOnMount={setGramNavigateOnMount} />
                    </>
                    )}
              </Box>
            </Grid>   
  
            {/* Main Panel  */}

            <Grid item xs={9} sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.primary.dark }}>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Routes>
                  <Route path="/enter-entry" element={<EnterEntry />} />
                  <Route path="/query-entry" element={<QueryEntry />} />
                  <Route path="/list-entries" element={<ListEntries refreshKey={refreshKey} tableContainerRef={tableContainerRef} />} />
                  <Route path="/edit-entry/:can" element={<EditEntry setRefreshKey={setRefreshKey} />} />
                  <Route path="/list-roots" element={< ListRoots refreshKey={refreshKey} tableContainerRef={tableContainerRef} />} />
                  <Route path="/edit-root/:root" element={< EditRoot />} />
                  <Route path="/enter-root" element={< EnterRoot />} />
                  <Route path="/enter-root/:root" element={< EnterRoot />} />
                  <Route path="/query-root" element={< QueryRoot />} />
                  <Route path="/export/csv" element={<ExportCsvForm />} />
                  <Route path="/export-pdf" element={<ExportPdfForm />} />
                  <Route path="/import/csv" element={<ImportCsvForm />} />
                  <Route path="/csv-info" element={<CsvInfo />} />
                  <Route path="/html-display/:label" element={<HtmlDisplay />} />
                </Routes>
              </Box>
            </Grid>
          </Grid>
      </ThemeProvider>
      </Container>
    </Router>
          );
}



export default App;
