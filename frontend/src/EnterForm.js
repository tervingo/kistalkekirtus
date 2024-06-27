import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './tkk.css';

import { SERVER_IP } from './constants';

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

    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const enterEntry = async (event) => {
        event.preventDefault();

        const response = await fetch(`${SERVER_IP}/api/enter-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ can, cat, pl, pl2, par, pul, pr, pa, fu, root, en, sw }),
        });
        const data = await response.json();
        console.log(data);
        setMessage('Entry stored successfully!');

        const alkono = await fetch(`${SERVER_IP}/api/query-root?root=${root}`);
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
        <div>
            <h2>Enter data </h2>
            <form onSubmit={enterEntry}>
                <label>
                    <h4>Ilven talke:</h4>
                    <input type="text" value={can} onChange={(e) => setCan(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Talsalke:</h4>
	                    <select value={cat} onChange={(e) => setCat(e.target.value)}>
                        <option value="">Select...</option>
                            <option value="AJ">Adjective</option>
                            <option value="AV">Adverb</option>
                            <option value="CJ">Conjunction</option>
                            <option value="IJ">Interjection</option>
                            <option value="NO">Noun</option>
                            <option value="NU">Number</option>
                            <option value="PF">Prefix</option>
                            <option value="PR">Pronoun</option>
                            <option value="QT">Quantifier</option>
                            <option value="SF">Suffix</option>
                            <option value="VB">Verb</option>
    	                </select>
                </label>
                <br/>
                <label>
                    <h4>Keno:</h4>
                    <input type="text" value={pl} onChange={(e) => setPl(e.target.value)} disabled={!['NO', 'PR'].includes(cat)} />
                </label>
                <br/>
                <label>
                    <h4>Keno+:</h4>
                    <input type="text" value={pl2} onChange={(e) => setPl2(e.target.value)} disabled={!['NO', 'PR'].includes(cat)} />
                </label>
                <br/>
                <label>
                    <h4>Akea:</h4>
                    <input type="text" value={par} onChange={(e) => setPar(e.target.value)} disabled={!['NO', 'PR'].includes(cat)} />
                </label>
                <br/>
                <label>
                    <h4>Pulso:</h4>
                    <input type="text" value={pul} onChange={(e) => setPul(e.target.value)} disabled={cat !== 'VB'} />
                </label>
                <br/>
                <label>
                    <h4>Aniren konivo:</h4>
                    <input type="text" value={pr} onChange={(e) => setPr(e.target.value)} disabled={cat !== 'VB'} />
                </label>
                <label>
                    <h4>Iniren konivo:</h4>
                    <input type="text" value={pa} onChange={(e) => setPa(e.target.value)} disabled={cat !== 'VB'} />
                </label>
                <br/>
                <label>
                    <h4>Uniren konivo:</h4>
                    <input type="text" value={fu} onChange={(e) => setFu(e.target.value)} disabled={cat !== 'VB'} />
                </label>
                <br/>
                <label>
                    <h4>Kono:</h4>
                    <input type="text" value={root} onChange={(e) => setRoot(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Inglis talkisvo:</h4>
                    <input type="text" value={en} onChange={(e) => setEn(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Swadesh:</h4>
                    <td><input type="checkbox" checked={sw === 1} onChange={(e) => setSw(e.target.checked ? 1 : 0)} /></td>
                </label>
                <br/><br/>
                <div className='button-container'>
                    <input className="nice-button" type="submit" value="Submit" />
                    <button className="nice-button" type="button" onClick={handleClear}>Clear</button>
                    <button className='nice-button' type="button" onClick={handleCancel}>Cancel</button>
                </div>
                               
            </form>
            <br />
            {message && <p>{message}</p>}
        </div>
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


    const navigate = useNavigate();

    const enterRoot = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/enter-root`, {
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
            <h2>Enter data </h2>
            <form onSubmit={enterRoot}>
                <label>
                    <h4>Kono:</h4>
                    <input type="text" value={root} onChange={(e) => setRoot(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Primary:</h4>
                    <input type="text" value={prim} onChange={(e) => setPrim(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Mod Act:</h4>
                    <input type="text" value={moda} onChange={(e) => setModa(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Active</h4>
                    <input type="text" value={act} onChange={(e) => setAct(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Mod Pas:</h4>
                    <input type="text" value={modp} onChange={(e) => setModp(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Passive:</h4>
                    <input type="text" value={pas} onChange={(e) => setPas(e.target.value)} />
                </label>
                <br/><br/>
                <div className='button-container'>
                    <input className="nice-button" type="submit" value="Submit" />
                    <button className="nice-button" type="button" onClick={handleClear}>Clear</button>
                    <button className='nice-button' type="button" onClick={handleCancel}>Cancel</button>
                </div>
                               
            </form>
            <br />
            {message && <p>{message}</p>}
        </div>
    );
}
