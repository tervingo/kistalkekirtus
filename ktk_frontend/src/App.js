import React, { useState  } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './tkk.css'; // Import your CSS file
// import './const.js';

import { EnterForm } from './EnterForm';
import { QueryForm } from './QueryForm';
import { ListForm } from './ListForm';
import { EditForm } from './EditForm';

import { SERVER_IP } from './constants';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    return (
        <Router>
            <div className="app">
                <div className="top-panel">
                    <h1>Ilven-Inglisen Kistalkekirtusen Karvoedarjus</h1>
                </div>
                <div className="content">
                    <nav className="sidebar">
                        <div className="left-pane">
                                <Link className="nice-link" to="/enter-entry">Unnen kistalke aunilli</Link>
                                <br/><br/>
                                <Link className="nice-link" to="/query-entry">Kistalkeeva massi</Link>
                                <br/><br/>
                                <Link className="nice-link" to="/list-entries">Uilen kistalkee salli</Link>
                                <br/><br/>
                                <button className='nice-link' onClick={() => window.open(`${SERVER_IP}/api/export/csv`, '_blank')}>CSV oikappi</button>
                                <br/><br/>
                                <button className='nice-link' onClick={() => window.open(`${SERVER_IP}/api/export/pdf`, '_blank')}>PDF oikappi</button>
                                <br/><br/>
                                {/* Add more links here... */}
                        </div>
                    </nav>

                    <div className="main">
                    <Routes>
                    <Route path="/enter-entry" element={<EnterForm />} />
                    <Route path="/query-entry" element={<QueryForm />} />
                    <Route path="/list-entries" element={<ListForm refreshKey={refreshKey} />} />
                    <Route path="/edit-entry/:can" element={<EditForm setRefreshKey={setRefreshKey} />} />
                        {/* Add more routes here... */}
                    </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
