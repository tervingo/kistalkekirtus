
import React, { useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './tkk.css';

import { SERVER_IP } from './constants';


export function EditForm({ setRefreshKey }) {

    const {can} = useParams();
    const [canState, setCan] = useState('');
    const [id, setId] = useState('');
    const [cat, setCat] = useState('');
    const [pl, setPl] = useState('');
    const [pl2, setPl2] = useState('');
    const [par, setPar] = useState('');
    const [pul, setPul] = useState('');
    const [pr, setPr] = useState('');
    const [pa, setPa] = useState('');
    const [fu, setFu] = useState('');
    const [root, setRoot] = useState('');
    const [en, setEn] = useState('');
    const [sw, setSw] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log(can);
        if (can) {
            const fetchEntry = async () => {
                const response = await fetch(`${SERVER_IP}/api/query-entry?${`can=${can}`}`);
                const data = await response.json();
                setId(data._id);
                setCan(data.can);
                setCat(data.cat);
                setPl(data.pl);
                setPl2(data.pl2);
                setPar(data.par);
                setPul(data.pul);
                setPr(data.pr);
                setPa(data.pa);
                setFu(data.fu);
                setRoot(data.root);
                setEn(data.en);
                setSw(data.sw);
            }
            fetchEntry();
        }
     }, [can]); 
    
    const navigate = useNavigate();
    
    const handleEdit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/edit-entry/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                can: canState,
                cat,
                pl,
                pl2,
                par,
                pul,
                pr,
                pa,
                fu,
                root,
                en,
                sw,
            }),
        });
//        const data = await response.json();
        setMessage("Entry updated successfully");
//        console.log(data);
        setRefreshKey(oldKey => oldKey + 1);
        navigate('/list-entries');
    };

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }
    
    return (
        <form onSubmit={handleEdit}>
                 <br/><br/>
                <table className="bordered-table">
                <tr>
                    <th>ILVEN</th>
                    <th>INGLIS</th>
                    <th>TSK</th>
                    <th>SWAD</th>
                    <th>KONO</th>
                    <th>KENO</th>
                    <th>KENO2</th>
                    <th>AKEA</th>
                    <th>PULSO</th>
                    <th>A-KONIVO</th>
                    <th>I-KONIVO</th>
                    <th>U-KONIVO</th>
                 </tr>
                <tr>
                            <td><input type="text" value={canState} onChange={(e) => setCan(e.target.value)} /></td>
                            <td><input type="text" value={en} onChange={(e) => setEn(e.target.value)} /></td>
                            <td>
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
	                            {/* Add more options here... */}
    	                        </select>
                            </td>
                            <td><input type="checkbox" checked={sw === 1} onChange={(e) => setSw(e.target.checked ? 1 : 0)} /></td>
                            <td><input type="text" value={root} onChange={(e) => setRoot(e.target.value)} /></td>
                            <td><input type="text" value={pl} onChange={(e) => setPl(e.target.value)}  disabled={cat !== 'NO'} /></td>
                            <td><input type="text" value={pl2} onChange={(e) => setPl2(e.target.value)} disabled={cat !== 'NO'}  /></td>
                            <td><input type="text" value={par} onChange={(e) => setPar(e.target.value)} disabled={cat !== 'NO'}  /></td>
                            <td><input type="text" value={pul} onChange={(e) => setPul(e.target.value)} disabled={cat !== 'VB'} /></td>
                            <td><input type="text" value={pr} onChange={(e) => setPr(e.target.value)} disabled={cat !== 'VB'} /></td>
                            <td><input type="text" value={pa} onChange={(e) => setPa(e.target.value)} disabled={cat !== 'VB'} /></td>
                            <td><input type="text" value={fu} onChange={(e) => setFu(e.target.value)} disabled={cat !== 'VB'} /></td>
                </tr>
            </table>
            <br/><br/>
            <div className='button-container'>
                <input className="nice-button" type="submit" value="Update" />
                <button className='nice-button' onClick={handleCancel}>Cancel</button>
             </div>
            {message && <p>{message}</p>} {/* Add this line */}
        </form>
    );
}

