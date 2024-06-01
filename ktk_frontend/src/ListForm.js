import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import './tkk.css';

import { SERVER_IP } from './constants';


export function ListForm({ refreshKey })  {
    const [translations, setTranslations] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);
    const { t } = useTranslation();
 
    useEffect(() => {
        const fetchTranslations = async () => {
            const response = await fetch(`${SERVER_IP}/api/list-entries`);
            let data = await response.json();

           // Add a 'firstLetter' field to each item in the 'translations' array
           data = data.map((item, index) => ({
                ...item,
                firstLetter: item.can[0].toUpperCase(),
            }));

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
            console.log(temp_data);
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
            <h2>{t('lex.entries.listEntries.pre-header')} ({translations.length} {t('lex.entries.listEntries.post-header')})</h2>
            <table className="bordered-table sticky-header">
                <tr>
                    <th>SALKE</th>
                    <th className='clickable-header' onClick={() => handleSort('can')}>ILVEN <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('en')}>INGLIS <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('cat')} width="50px">TS <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('sw')} width="50px">SW <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown}/></th>
                    <th className='clickable-header' onClick={() => handleSort('root')}>KONO <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th>KENO</th>
                    <th>KENO2</th>
                    <th>AKEA</th>
                    <th>PULSO</th>
                    <th>A-KONIVO</th>
                    <th>I-KONIVO</th>
                    <th>U-KONIVO</th>
                    <th width="80px">KARSOTA</th>

                </tr>
                {translations.map((translation, index) => (
                     <tr key={index} id={`entry-${translation.firstLetter}`}>
                            <td>{translation.number}</td>
                            <td>{translation.can}</td>
                            <td>{translation.en}</td>
                            <td>{translation.cat}</td>
                            <div className="custom-checkbox">
                                <input type="checkbox" id="swadesh" checked={translation.sw === 1} disabled />
                                <label htmlFor="swadesh"></label>
                            </div>
                            <td>
                                {translation.root 
                                ? <Link to="/list-roots">{translation.root}</Link> 
                                : '<ilkonoi>'
                                }
                            </td>
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
                                <FontAwesomeIcon className='nice-pencil' icon={faCopy} onClick={() => handleCopy(translation)} />

                            </td>
                     </tr>
            ))}
            </table>
        </div>
    );
}
