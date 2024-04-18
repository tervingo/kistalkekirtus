import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import './tkk.css';

import { SERVER_IP } from './constants';

export function ListForm({ refreshKey })  {
    const [translations, setTranslations] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);


    useEffect(() => {
        const fetchTranslations = async () => {
            const response = await fetch(`${SERVER_IP}/api/list-entries`);
            let data = await response.json();
            setTranslations(data);
        };
        fetchTranslations();
    }, [refreshKey, refresh]);

    useEffect(() => {
        let sortedTranslations = [...translations];
        if (sortField !== null) {
            sortedTranslations.sort((a, b) => {
                if (a[sortField] < b[sortField]) return sortDirection ? -1 : 1;
                if (a[sortField] > b[sortField]) return sortDirection ? 1 : -1;
                return 0;
            });
        }
        setTranslations(sortedTranslations);
    }, [sortField, sortDirection]);

    const handleSort = (field) => {
        if (field === sortField) {
            setSortDirection(!sortDirection);
        } else {
            setSortField(field);
            setSortDirection(true);
        }
    };

    const navigate = useNavigate();

    const handleEdit = async (can) => {
        // Handle the edit action here
        navigate(`/edit-entry/${can}`);
    };  

    const handleDelete = async (can) => {
        if (window.confirm(`Are you sure you want to delete ${can}?`)) 
        {
            const temp = await fetch(`${SERVER_IP}/api/query-entry?${`can=${can}`}`);
            const temp_data = await temp.json();
            const response = await fetch(`${SERVER_IP}/api/delete-entry/${temp_data._id}`, {
                method: 'DELETE',
            });
            if (response) {
                setRefresh(refresh + 1); // Increment refresh here
//                navigate(`/list-entries`);
            }
        }
    };

    const handleCopy = (translation) => {
        navigate('/enter-entry', { state: { translation: translation } });
    };
    
    
    return (
        <div>
            <h2>Uilen kistalkee ({translations.length} kistalkee)</h2>
            <table className="bordered-table">
                <tr>
                    <th className='clickable-header' onClick={() => handleSort('can')}>ILVEN</th>
                    <th className='clickable-header' onClick={() => handleSort('en')}>INGLIS</th>
                    <th className='clickable-header' onClick={() => handleSort('cat')}>TSK</th>
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
                            <td>{translation.pl}</td>
                            <td>{translation.pl2}</td>
                            <td>{translation.par}</td>
                            <td>{translation.pr}</td>
                            <td>{translation.pa}</td>
                            <td>{translation.fu}</td>
                            <td>{translation.root}</td>
                            <td>
                                <FontAwesomeIcon className='nice-pencil' icon={faPencilAlt} onClick={() => handleEdit(translation.can)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faTrashAlt} onClick={() => handleDelete(translation.can)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faCopy} onClick={() => handleCopy(translation)} />

                            </td>

                     </tr>
            ))}
            </table>
        </div>
    );
}
