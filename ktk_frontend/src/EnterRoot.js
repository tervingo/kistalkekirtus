import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './tkk.css';

import { SERVER_IP } from './constants';


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
 /*        let url = `${SERVER_IP}/api/enter-root`;
        if (root) {
            url += `/?root=${root}`;
        }
 */        const response = await fetch(`${SERVER_IP}/api/enter-root`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ root : root, prim, moda, act, modp, pas }),
        });
        const data = await response.json();
        console.log(data);
        setMessage('Entry stored successfully!'); // Add this line
        handleClear(); // Add this line
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
            {message && <p>{message}</p>} {/* Add this line */}
        </div>
    );
}
