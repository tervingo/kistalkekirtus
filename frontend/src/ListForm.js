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

// LIST ENTRIES

export function ListEntries({ refreshKey })  {
    const [translations, setTranslations] = useState([]);
    const [sortField, setSortField] = useState('can');
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchAndSortTranslations = async () => {
            const response = await fetch(`${SERVER_IP}/api/list-entries`);
            let data = await response.json();
    
            // Add a 'firstLetter' field to each item in the 'translations' array
            data = data.map((item, index) => ({
                ...item,
                firstLetter: sortField && item[sortField] ? item[sortField][0] : '',
            }));
    
            // Sort the data
            if (sortField !== null) {
                data.sort((a, b) => {
                    if (a[sortField] < b[sortField]) return sortDirection ? -1 : 1;
                    if (a[sortField] > b[sortField]) return sortDirection ? 1 : -1;
                    return 0;
                });
            }
    
            setTranslations(data);
        };
    
        fetchAndSortTranslations();
    }, [refreshKey, refresh, sortField, sortDirection]);
    



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
                setRefresh(refresh + 1); 
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
                    <th className='clickable-header' onClick={() => handleSort('num')}>{t('lex.entries.listEntries.num')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('can')}>{t('lex.entries.listEntries.iv')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('en')}>{t('lex.entries.listEntries.en')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('cat')} width="50px">{t('lex.entries.listEntries.cat')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th className='clickable-header' onClick={() => handleSort('sw')} width="50px">{t('lex.entries.listEntries.sw')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown}/></th>
                    <th className='clickable-header' onClick={() => handleSort('root')}>{t('lex.entries.listEntries.root')}<FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th>{t('lex.entries.listEntries.pl')}</th>
                    <th>{t('lex.entries.listEntries.pl2')}</th>
                    <th>{t('lex.entries.listEntries.par')}</th>
                    <th>{t('lex.entries.listEntries.pul')}</th>
                    <th>{t('lex.entries.listEntries.prstem')}</th>
                    <th>{t('lex.entries.listEntries.pastem')}</th>
                    <th>{t('lex.entries.listEntries.fustem')}</th>
                    <th width="80px">{t('lex.entries.listEntries.acts')}</th>

                </tr>
                {translations.map((translation, index) => (
                     <tr key={index} id={`entry-${translation.firstLetter}`}>
                             <td>{translation.num}</td>
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


// LIST ROOTS

export function ListRoots({ refreshKey })  {
    const [roots, setRoots] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState(true); // true for ascending, false for descending
    const [refresh, setRefresh] = useState(0);

 
    useEffect(() => {
        const fetchRoots = async () => {
            const response = await fetch(`${SERVER_IP}/api/list-roots`);
            let data = await response.json(); 

           // Add a 'firstLetter' field to each item in the 'roots' array
           data = data.map((item, index) => ({
                ...item,
                firstLetter: item.root[0].toLowerCase(),
            }));

            setRoots(data);
        };
        fetchRoots();
    }, [refreshKey, refresh]);

    useEffect(() => {
        let sortedRoots = [...roots];
        if (sortField !== null) {
            sortedRoots.sort((a, b) => {
                if (a[sortField] < b[sortField]) return sortDirection ? -1 : 1;
                if (a[sortField] > b[sortField]) return sortDirection ? 1 : -1;
                return 0;
            });
        }
        setRoots(sortedRoots);
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

    const handleEdit = async (root) => {
        // Handle the edit action here  
        navigate(`/edit-root/${root}`);
    };  

    const handleDelete = async (root) => {
        if (window.confirm(`Are you sure you want to delete the root ${root}?`)) 
        {
            const temp = await fetch(`${SERVER_IP}/api/query-root?${`root=${root}`}`);
            const temp_data = await temp.json();
            console.log(temp_data);
            const response = await fetch(`${SERVER_IP}/api/delete-root/${temp_data._id}`, {
                method: 'DELETE',
            });
            if (response) {
                setRefresh(refresh + 1); // Increment refresh here
                navigate(`/list-roots`);
            }
        }
    };

    const handleCopy = (root) => {
        navigate('/enter-root', { state: { root: root } });
    };

    return (
        <div>
            <h2>Uilen konoi ({roots.length} konoi)</h2>
            <table className="bordered-table sticky-header">
                <tr>
                    <th>SALKE</th>
                    <th className='clickable-header' onClick={() => handleSort('root')}>KONO <FontAwesomeIcon className='nice-pencil' icon={faArrowsUpDown} /></th>
                    <th>PRIMARY</th>
                    <th>MOD-ACT</th>
                    <th>ACTIVE</th>
                    <th>MOD-PAS</th>
                    <th>PASSIVE</th>
                    <th width="80px">KARSOTA</th>

                </tr>
                {roots.map((root, index) => (
                     <tr key={index} id={`entry-${root.firstLetter}`}>
                            <td>{root.number}</td>
                            <td>{root.root}</td>
                            <td>{root.prim}</td>
                            <td>{root.moda}</td>
                            <td>{root.act}</td>
                            <td>{root.modp}</td>
                            <td>{root.pas}</td>
                             <td>
                                <FontAwesomeIcon className='nice-pencil' icon={faPencilAlt} onClick={() => handleEdit(root.root)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faTrashAlt} onClick={() => handleDelete(root.root)} />
                                <FontAwesomeIcon className='nice-pencil' icon={faCopy} onClick={() => handleCopy(root)} />

                            </td>
                     </tr>
            ))}
            </table>
        </div>
    );
}
