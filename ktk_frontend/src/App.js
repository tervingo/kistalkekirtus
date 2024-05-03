import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
                        </div>
                    </nav>
                    <MainComponent />
                </div>
            </div>
        </Router>
    );
}


export default App;
