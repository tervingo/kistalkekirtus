import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './tkk.css';

import { SERVER_IP } from './constants';

// QUERY ENTRY

export function QueryEntry() {
    const [search, setSearch] = useState('');
    const [translations, setTranslations] = useState([]);
 
 // Main queryEntry function

    const queryEntry = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/search-entries?search=${search}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setTranslations(data);
    };

// Edit an entry

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        navigate(`/edit-entry/${can}`);
    };    

// Delete an entry

    const handleDelete = async (id, can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) {
            const response = await fetch(`${SERVER_IP}/api/delete-entry/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
        }
    };

// Clear form

    const handleClear = () => {
        setSearch('');
        setTranslations([]);
    };

// Cancel

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }


//  Return form 

    return (
        <div>
            <h2> Search data </h2>
            <form onSubmit={queryEntry}>           
                <label>
                    <h4>Search expression:</h4>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </label>
                <br/><br/>
                <div className='button-container'>
                    <input className='nice-button' type="submit" value="Search" />
                    <button className='nice-button' type="button" onClick={handleCancel}>Cancel</button>
                </div>
                <div>
                    <h2>Search Results:</h2>
                    <table className="bordered-table">
                        <tr>
                            <th>ILVEN</th>
                            <th>INGLIS</th>
                            <th>TSK</th>
                            <th>KONO</th>
                            <th>KENO</th>
                            <th>KENO2</th>
                            <th>AKEA</th>
                            <th>PULSO</th>
                            <th>A-KONIVO</th>
                            <th>I-KONIVO</th>
                            <th>U-KONIVO</th>
                            <th>KARSOTA</th>
                        </tr>
                        {Array.isArray(translations) && translations.map((translation, index) => (
                        <tr key={index}>
                            <td>{translation.can}</td>
                            <td>{translation.en}</td>
                            <td>{translation.cat}</td>
                            <td>{translation.root ? translation.root : '<ilkonoi>'}</td>
                            <td>{translation.pl}</td>
                            <td>{translation.pl2}</td>
                            <td>{translation.par}</td>
                            <td>{translation.pul}</td>
                            <td>{translation.pr}</td>
                            <td>{translation.pa}</td>
                            <td>{translation.fu}</td>
                            <td>
                                <FontAwesomeIcon className='nice-pencil' icon={faPencilAlt} onClick={() => handleEdit(translation.can)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faTrashAlt} onClick={() => handleDelete(translation.can)} />
                             </td>
                        </tr>
                    ))}
                    </table>
                </div>
            </form>
            <br/>
            <button className='nice-button' onClick={handleClear}>Clear</button>
        </div>
    );
}

// QUERY ROOT


export function QueryRoot() {
    const [search, setSearch] = useState('');
    const [roots, setRoots] = useState([]);
 
 // Main queryEntry function

    const queryRoot = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/search-roots?search=${search}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setRoots(data);
    };

// Edit an entry

    const navigate = useNavigate();

    const handleEdit = async (root) => {
        navigate(`/edit-root/${root}`);
    };    

// Delete an entry

    const handleDelete = async (id, root) => {
        if (window.confirm(`Are you sure you want to delete ${root}?`)) {
            const response = await fetch(`${SERVER_IP}/api/delete-root/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
        }
    };

// Clear form

    const handleClear = () => {
        setSearch('');
        setRoots([]);
    };

// Cancel

    const handleCancel = async () => {
        navigate(`/list-entries`);
    }

//  Return form 

    return (
        <div>
            <h2> Search data </h2>
            <form onSubmit={queryRoot}>           
                <label>
                    <h4>Search expression:</h4>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </label>
                <br/><br/>
                <div className='button-container'>
                    <input className='nice-button' type="submit" value="Search" />
                    <button className='nice-button' type="button" onClick={handleCancel}>Cancel</button>
                </div>
                <div>
                    <h2>Search Results:</h2>
                    <table className="bordered-table">
                        <tr>
                            <th>KONO</th>
                            <th>PRIMARY</th>
                            <th>MODE ACT</th>
                            <th>ACTIVE</th>
                            <th>MODE PAS</th>
                            <th>PASSIVE</th>
                        </tr>
                        {Array.isArray(roots) && roots.map((root, index) => (
                        <tr key={index}>
                            <td>{root.root}</td>
                            <td>{root.prim}</td>
                            <td>{root.moda}</td>
                            <td>{root.act}</td>
                            <td>{root.modp}</td>
                            <td>{root.pas}</td>
                             <td>
                                <FontAwesomeIcon className='nice-pencil' icon={faPencilAlt} onClick={() => handleEdit(root.root)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faTrashAlt} onClick={() => handleDelete(root.root)} />
                             </td>
                        </tr>
                    ))}
                    </table>
                </div>
            </form>
            <br/>
            <button className='nice-button' onClick={handleClear}>Clear</button>
        </div>
    );
}

