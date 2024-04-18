import React, { useState, useEffect  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './tkk.css';

import { SERVER_IP } from './constants';

export function EnterForm() {

    const location = useLocation();
    const initialTranslation = location.state?.translation || {};

    const [can, setCan] = useState(initialTranslation.can || '');
    const [cat, setCat] = useState(initialTranslation.cat || '');
    const [pl, setPl] = useState(initialTranslation.pl || '');
    const [pl2, setPl2] = useState(initialTranslation.pl2 || '');
    const [par, setPar] = useState(initialTranslation.par || '');
    const [pr, setPr] = useState(initialTranslation.pr || '');
    const [pa, setPa] = useState(initialTranslation.pa || '');
    const [fu, setFu] = useState(initialTranslation.fu || '');
    const [root, setRoot] = useState(initialTranslation.root || '');
    const [en, setEn] = useState(initialTranslation.en || '');

    const [message, setMessage] = useState('');


    const navigate = useNavigate();
    const enterEntry = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/enter-entry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ can, cat, pl, pl2, par, pr, pa, fu, root, en }),
        });
        const data = await response.json();
        console.log(data);
        setMessage('Entry stored successfully!'); // Add this line
        handleClear(); // Add this line
        navigate(`/list-entries`);
    };

    const handleClear = () => {
        setCan('');
        setCat('');
        setPl('');
        setPl2('');
        setPar('');
        setPr('');
        setPa('');
        setFu('');
        setRoot('');
        setEn('');
    };

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
                            <option value="SF">Suffix</option>
                            <option value="VB">Verb</option>
	                        {/* Add more options here... */}
    	                </select>
                </label>
                <br/>
                <label>
                    <h4>Keno:</h4>
                    <input type="text" value={pl} onChange={(e) => setPl(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Keno+:</h4>
                    <input type="text" value={pl2} onChange={(e) => setPl2(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Akea:</h4>
                    <input type="text" value={par} onChange={(e) => setPar(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Aniren konivo:</h4>
                    <input type="text" value={pr} onChange={(e) => setPr(e.target.value)} />
                </label>
                <label>
                    <h4>Iniren konivo:</h4>
                    <input type="text" value={pa} onChange={(e) => setPa(e.target.value)} />
                </label>
                <br/>
                <label>
                    <h4>Uniren konivo:</h4>
                    <input type="text" value={fu} onChange={(e) => setFu(e.target.value)} />
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
                <br/><br/>
                <div className='bttonn-container'>
                    <input className="nice-button" type="submit" value="Submit" />
                    <button className="nice-button" type="button" onClick={handleClear}>Clear</button>
                </div>
                               
            </form>
            <br />
            {message && <p>{message}</p>} {/* Add this line */}
        </div>
    );
}
