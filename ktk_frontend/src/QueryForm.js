import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './tkk.css';

import { SERVER_IP } from './constants';

export function QueryForm() {
    const [search, setSearch] = useState('');
    const [translations, setTranslations] = useState([]);

    const queryEntry = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/search-entries?search=${search}`);
        console.log(response);
        const data = await response.json();
        console.log(data);
        setTranslations(data);
    };

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        navigate(`/edit-entry/${can}`);
    };    

    const [del_message, setMessage] = useState('');

    const handleDelete = async (id, can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) {
            const response = await fetch(`${SERVER_IP}/api/delete-entry/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Entry deleted successfully');
            } else {
                setMessage('Failed to delete entry');
            }
        }
    };

    const handleClear = () => {
        setSearch('');
        setTranslations([]);
    };

    return (
        <div>
            <h2> Search data </h2>
            <form onSubmit={queryEntry}>           
                <label>
                    <h4>Search expression:</h4>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                </label>
                <br/><br/>
                <input className='nice-button' type="submit" value="Search" />
                <div>
                    <h2>Search Results:</h2>
                    <table className="bordered-table">
                        <tr>
                            <th>ILVEN</th>
                            <th>INGLIS</th>
                            <th>TSK</th>
                            <th>KENO</th>
                            <th>KENO2</th>
                            <th>AKEA</th>
                            <th>A-KONIVO</th>
                            <th>I-KONIVO</th>
                            <th>U-KONIVO</th>
                            <th>KONO</th>
                            <th>KARSOTA</th>
                        </tr>
                        {translations.map((translation, index) => (
                        <tr key={index}>
                            <td>{translation.can}</td>
                            <td>{translation.en}</td>
                            <td>{translation.cat}</td>
                            <td>{translation.root ? translation.root : '<ilkonoi>'}</td>
                            <td>{translation.pl}</td>
                            <td>{translation.pl2}</td>
                            <td>{translation.par}</td>
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
