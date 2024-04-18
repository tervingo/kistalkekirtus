import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './tkk.css';

import { SERVER_IP } from './constants';

export function QueryForm() {
    const [can, setCan] = useState('');
    const [en, setEn] = useState('');

    const [searchResults, setSearchResults] = useState(null);

    const queryEntry = async (event) => {
        event.preventDefault();
        const response = await fetch(`${SERVER_IP}/api/query-entry?${can ? `can=${can}` : `en=${en}`}`);
        const data = await response.json();
        setSearchResults(data);
    };

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        // Handle the edit action here
        navigate(`/edit-entry/${can}`);
    };    

    const [del_message, setMessage] = useState(''); // Add this line

const handleDelete = async (id, can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) {
            const response = await fetch(`${SERVER_IP}/api/delete-entry/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            // Update the message state
            if (response.ok) {
                setMessage('Entry deleted successfully');
            } else {
                setMessage('Failed to delete entry');
            }
        }

    };

    const handleClear = () => {
            setCan('');
            setEn('');
            setSearchResults(null);
        };

    return (
        <div>
            <h2> Search data </h2>
            <form onSubmit={queryEntry}>
                <label>
                    <h4>Ilvian word:</h4>
                    <input type="text" value={can} onChange={(e) => setCan(e.target.value)} />
                </label>
                <label>
                    <h4>English word:</h4>
                    <input type="text" value={en} onChange={(e) => setEn(e.target.value)} />
                </label>
                <br/><br/>
                <input className='nice-button' type="submit" value="Search" />

               {searchResults && (
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
                        <tr>
                            <td>{searchResults.can}</td>
                            <td>{searchResults.en}</td>
                            <td>{searchResults.cat}</td>
                            <td>{searchResults.pl}</td>
                            <td>{searchResults.pl2}</td>
                            <td>{searchResults.par}</td>
                            <td>{searchResults.pr}</td>
                            <td>{searchResults.pa}</td>
                            <td>{searchResults.fu}</td>
                            <td>{searchResults.root}</td>
                            <td>
                                <FontAwesomeIcon className='nice-pencil' icon={faPencilAlt} onClick={() => handleEdit(searchResults.can)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faTrashAlt} onClick={() => handleDelete(searchResults._id, searchResults.can)} />
                            </td>
                        </tr>
                    </table>
                    <br/><br/>
                    {del_message && <p>{del_message}</p>}
                </div>
            )}

            </form>
            <br/>
            <button className='nice-button' onClick={handleClear}>Clear</button>
        </div>
    );
}