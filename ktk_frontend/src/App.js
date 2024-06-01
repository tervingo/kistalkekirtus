import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './tkk.css';
import './grammar.css';
import './i18n';

import { EnterForm } from './EnterForm';
import { QueryForm } from './QueryForm';
import { ListForm } from './ListForm';
import { EditForm } from './EditForm';
import { ExportCsvForm } from './ExportCsvForm';
import { ExportPdfForm } from './ExportPdfForm';
import { ImportCsvForm } from './ImportCsvForm';
import { CsvInfo } from './ImportCsvForm';
import { ListRoots } from './ListRoots';
import { EditRoot } from './EditRoot';
import { QueryRoot } from './QueryRoot';
import { EnterRoot } from './EnterRoot';
import { HtmlDisplay } from './DisplayHtml';
import { LexTreeView } from './LexTreeView';
import { GramTreeView } from './GramTreeView';
import { LetterTable } from './LetterTable'; 

function LanguageSwitcher() {
    const { i18n } = useTranslation();
  
    const changeLanguage = (language) => {
      i18n.changeLanguage(language);
    };
  
    return (
      <div className="language-switcher">
        <button className='nice-switcher' onClick={() => changeLanguage('en')}>EN</button>
        <button className='nice-switcher' onClick={() => changeLanguage('iv')}>IV</button>
        {/* Add more buttons for other languages */}
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

    function MainComponent() {

        const navigate = useNavigate();

        useEffect(() => {
            if (isFirstRender) {
                navigate('/list-entries');
                setIsFirstRender(false);
            }
        }, [navigate]);

        return (
            <div className="main">
                <Routes>
                    <Route path="/enter-entry" element={<EnterForm />} />
                    <Route path="/query-entry" element={<QueryForm />} />
                    <Route path="/list-entries" element={<ListForm refreshKey={refreshKey} />} />
                    <Route path="/edit-entry/:can" element={<EditForm setRefreshKey={setRefreshKey} />} />
                    <Route path="/list-roots" element={< ListRoots />} />
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
    }

    function handleLetterClick(letter) {
        // Scroll to the first entry in the CAN column (ILVEN) that starts with the clicked letter
        const element = document.getElementById(`entry-${letter}`);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth"
          });
        }
      }

    return (
        <Router>
            <div className="app">
                <div className="top-panel">
                    <LanguageSwitcher />
                    <h1>{t('title')}</h1>
                    <img src=".\kantokirtur.jpg" alt="Kantokirtur" />
                </div>
                <div className="content">
                    <nav className="sidebar">
                        <div className="left-pane">
                            <div className="tabs">
                                <button className={activeTab === 'LEXICON' ? 'active' : ''} onClick={() => { setActiveTab('LEXICON'); setLexNavigateOnMount(true); setGramNavigateOnMount(false); } }>{t('tabs.lexicon')}</button>

                                <button className={activeTab === 'GRAMMAR' ? 'active' : ''} onClick={() => { setActiveTab('GRAMMAR'); setGramNavigateOnMount(true); setLexNavigateOnMount(false); } }>{t('tabs.grammar')}</button>
                            </div>
                            {activeTab === 'LEXICON' && (
                                <>        
                                    <LexTreeView LexNavigateOnMount={lexNavigateOnMount} setLexNavigateOnMount={setLexNavigateOnMount} />
                                    <LetterTable handleLetterClick={handleLetterClick} />                       
                                </>
                                )}
                             {activeTab === 'GRAMMAR' && (
                                <>
                                    <GramTreeView GramNavigateOnMount={gramNavigateOnMount} setGramNavigateOnMount={setGramNavigateOnMount} />
                                </>
                                )}
                          </div>
                    </nav>
                    <MainComponent />
                </div>
            </div>
        </Router>
    );
}

export default App;
