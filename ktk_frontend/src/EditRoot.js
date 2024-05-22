import React, { useState, useEffect  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './tkk.css';

import { SERVER_IP } from './constants';


export function EditRoot() {

    const {root} = useParams();
    const [rootState, setRoot] = useState('');
    const [id, setId] = useState('');
    const [moda, setModa] = useState('');
    const [act, setAct] = useState('');
    const [modp, setModp] = useState('');
    const [pas, setPas] = useState('');
    const [message, setMessage] = useState('');

    console.log('EditRoot component rendering');

    useEffect(() => {
        console.log('root: ',root);
//        if (root) {
            const fetchRoot = async () => {
                const url = `${SERVER_IP}/api/query-root?root=${root}`;
                console.log('url: ', url);
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setId(data._id);
                    setRoot(data.root);
                    setModa(data.moda);
                    setAct(data.act);
                    setModp(data.modp);
                    setPas(data.pas);
                }
                else {
                    console.log('Error with fetch: ', response.status, response.statusText);
                }
            }
            fetchRoot();
//        }
     }, []); 
    
    const navigate = useNavigate();
    
    const handleEdit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/edit-root/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                root: rootState,
                moda,
                act,
                modp,
                pas,
            }),
        });
//        const data = await response.json();
        setMessage("Root updated successfully");
//        console.log(data);
//        setRefreshKey(oldKey => oldKey + 1);
        navigate('/list-roots');
    };

    const handleCancel = async () => {
        navigate(`/list-roots`);
    }
    
    return (
        <form onSubmit={handleEdit}>
                <br/><br/>
                <table className="bordered-table">
                <tr>
                    <th>KONO</th>
                    <th>MODE ACT</th>
                    <th>ACTIVE</th>
                    <th>MODE PAS</th>
                    <th>PASSIVE</th>
                 </tr>
                <tr>
                            <td><input type="text" value={rootState} onChange={(e) => setRoot(e.target.value)} /></td>
                            <td><input type="text" value={moda} onChange={(e) => setModa(e.target.value)} /></td>
                            <td><input type="text" value={act} onChange={(e) => setAct(e.target.value)} /></td>
                            <td><input type="text" value={modp} onChange={(e) => setModp(e.target.value)} /></td>
                            <td><input type="text" value={pas} onChange={(e) => setPas(e.target.value)} /></td>
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

