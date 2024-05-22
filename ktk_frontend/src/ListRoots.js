import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import './tkk.css';

import { SERVER_IP } from './constants';


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
                firstLetter: item.root[0].toUpperCase(),
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
