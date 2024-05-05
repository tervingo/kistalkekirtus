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

import { SERVER_IP } from './constants';


function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    
    function MainComponent() {
        const navigate = useNavigate();

        useEffect(() => {
            if (isFirstRender) {
                navigate('/list-entries');
                setIsFirstRender(false);
            }
        }, [navigate, isFirstRender]);

        return (
            <div className="main">
                <Routes>
                    <Route path="/enter-entry" element={<EnterForm />} />
                    <Route path="/query-entry" element={<QueryForm />} />
                    <Route path="/list-entries" element={<ListForm refreshKey={refreshKey} />} />
                    <Route path="/edit-entry/:can" element={<EditForm setRefreshKey={setRefreshKey} />} />
                    <Route path="/export/csv" element={<ExportCsvForm />} />
                    <Route path="/export/pdf" element={<ExportPdfForm />} />
                </Routes>
            </div>
        );
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
                            <Link className="nice-link" to="/list-entries">Uilen kistalkee salli</Link>
                            <br/><br/>
                            <Link className="nice-link" to="/enter-entry">Unnen kistalke aunilli</Link>
                            <br/><br/>
                            <Link className="nice-link" to="/query-entry">Kistalkeeva massi</Link>
                            <br/><br/>
                            <Link className='nice-link' to="/export/csv" >CSV oikappi</Link>
                            <br/><br/>
                            <Link className='nice-link' to="/export/pdf" >PDF oikappi</Link>
                            <br/><br/>
                                <table className='letter-table'>
                                <tr>
                                    <td><FontAwesomeIcon icon={faA} /></td>
                                    <td><FontAwesomeIcon icon={faB} /></td>
                                    <td><FontAwesomeIcon icon={faC} /></td>
                                    <td><FontAwesomeIcon icon={faD} /></td>
                                    <td><FontAwesomeIcon icon={faE} /></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faF} /></td>
                                    <td><FontAwesomeIcon icon={faG} /></td>
                                    <td><FontAwesomeIcon icon={faH} /></td>
                                    <td><FontAwesomeIcon icon={faI} /></td>
                                    <td><FontAwesomeIcon icon={faJ} /></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faK} /></td>
                                    <td><FontAwesomeIcon icon={faL} /></td>
                                    <td><FontAwesomeIcon icon={faM} /></td>
                                    <td><FontAwesomeIcon icon={faN} /></td>
                                    <td><FontAwesomeIcon icon={faO} /></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faP} /></td>
                                    <td><FontAwesomeIcon icon={faR} /></td>
                                    <td><FontAwesomeIcon icon={faS} /></td>
                                    <td><FontAwesomeIcon icon={faT} /></td>
                                    <td><FontAwesomeIcon icon={faU} /></td>
                                </tr>
                                <tr>
                                    <td><FontAwesomeIcon icon={faV} /></td>
                                    <td><FontAwesomeIcon icon={faW} /></td>
                                    <td><FontAwesomeIcon icon={faX} /></td>
                                    <td><FontAwesomeIcon icon={faY} /></td>
                                    <td><FontAwesomeIcon icon={faZ} /></td>
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
