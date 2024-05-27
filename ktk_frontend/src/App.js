import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faB, faC, faD, faE } from '@fortawesome/free-solid-svg-icons';
import { faF, faG, faH, faI, faJ } from '@fortawesome/free-solid-svg-icons';
import { faK, faL, faM, faN, faO } from '@fortawesome/free-solid-svg-icons';
import { faP, faR, faS, faT, faU } from '@fortawesome/free-solid-svg-icons';
import { faV, faW, faX, faY, faZ } from '@fortawesome/free-solid-svg-icons';

import './tkk.css'; // Import your CSS file
// import './const.js';

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
 
function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [activeTab, setActiveTab] = useState('LEXICON');

    
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
                    <Route path="/html-display" element={<HtmlDisplay />} />
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
            behavior: "smooth" // Optional: Smooth scrolling
          });
        }
      }
      
    return (
        <Router>
            <div className="app">
                <div className="top-panel">
                    <h1>Ilven-Inglisen Kistalkekirtusen Karvoedarjus</h1>
                </div>
                <div className="content">
                    <nav className="sidebar">
                        <div className="left-pane">
                            <div className="tabs"> {/* Add this div for tabs */}
                                <button className={activeTab === 'LEXICON' ? 'active' : ''} onClick={() => setActiveTab('LEXICON')}>LEXICON</button>
                                <button className={activeTab === 'GRAMMAR' ? 'active' : ''} onClick={() => setActiveTab('GRAMMAR')}>GRAMMAR</button>
                            </div>
                            {activeTab === 'LEXICON' && (
                                <>
                                    <Link className="nice-link entries" to="/list-entries">Uilen kistalkee salli</Link>
                                    <br/><br/>
                                    <Link className="nice-link entries" to="/enter-entry">Unnen kistalkeva aunilli</Link>
                                    <br/><br/>
                                    <Link className="nice-link entries" to="/query-entry">Kistalkeeva massi</Link>
                                    <br/><br/>
                                    <Link className="nice-link roots" to="/list-roots">Uilen konoi salli</Link>
                                    <br/><br/>
                                    <Link className="nice-link roots" to="/enter-root">Unnen konova aunilli</Link>
                                    <br/><br/>
                                    <Link className="nice-link roots" to="/query-root">Konoiva massi</Link>
                                    <br/><br/>
                                    <Link className='nice-link files' to="/export/csv" >CSV oinilli</Link>
                                    <br/><br/>
                                    <Link className='nice-link files' to="/export/pdf" >PDF oinilli</Link>
                                    <br/><br/>
                                    <Link className='nice-link csv' to="import/csv" >CSV aunilli</Link>
                                    <br/><br/>
                                    <Link className='nice-link csv' to="/csv-info" >CSV aro</Link>
                                </>
                                )}
                            {activeTab === 'GRAMMAR' && (
                                <>
                                    <Link className='nice-link entries' to="/html-display" >Show Declensions</Link>
                                </>
                                )}

                                <table className='letter-table'>
                                <tr>
                                    <td onClick={() => handleLetterClick('A')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faA} /></td>
                                    <td onClick={() => handleLetterClick('B')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faB} /></td>
                                    <td onClick={() => handleLetterClick('C')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faC} /></td>
                                    <td onClick={() => handleLetterClick('D')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faD} /></td>
                                    <td onClick={() => handleLetterClick('E')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faE} /></td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleLetterClick('F')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faF} /></td>
                                    <td onClick={() => handleLetterClick('G')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faG} /></td>
                                    <td onClick={() => handleLetterClick('H')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faH} /></td>
                                    <td onClick={() => handleLetterClick('I')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faI} /></td>
                                    <td onClick={() => handleLetterClick('J')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faJ} /></td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleLetterClick('K')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faK} /></td>
                                    <td onClick={() => handleLetterClick('L')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faL} /></td>
                                    <td onClick={() => handleLetterClick('M')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faM} /></td>
                                    <td onClick={() => handleLetterClick('N')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faN} /></td>
                                    <td onClick={() => handleLetterClick('O')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faO} /></td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleLetterClick('P')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faP} /></td>
                                    <td onClick={() => handleLetterClick('R')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faR} /></td>
                                    <td onClick={() => handleLetterClick('S')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faS} /></td>
                                    <td onClick={() => handleLetterClick('T')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faT} /></td>
                                    <td onClick={() => handleLetterClick('U')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faU} /></td>
                                </tr>
                                <tr>
                                    <td onClick={() => handleLetterClick('V')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faV} /></td>
                                    <td onClick={() => handleLetterClick('W')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faW} /></td>
                                    <td onClick={() => handleLetterClick('X')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faX} /></td>
                                    <td onClick={() => handleLetterClick('Y')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faY} /></td>
                                    <td onClick={() => handleLetterClick('X')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faZ} /></td>
                                </tr>

                            </table>
                          </div>
                    </nav>
                    <MainComponent />
                </div>
            </div>
        </Router>
    );
}


export default App;
