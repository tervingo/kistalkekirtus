import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faR, faS, faT, faU, faV, faW, faX, faY, faZ } from '@fortawesome/free-solid-svg-icons';

export const LetterTable = ({ handleLetterClick }) => (
    <table className='letter-table'>
        <tr>
            <td onClick={() => handleLetterClick('A')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faA} /></td>
            <td onClick={() => handleLetterClick('B')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faB} /></td>
            <td onClick={() => handleLetterClick('C')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faC} /></td>
            <td onClick={() => handleLetterClick('D')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faD} /></td>
            <td onClick={() => handleLetterClick('E')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faE} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('F')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faF} /></td>
            <td onClick={() => handleLetterClick('G')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faG} /></td>
            <td onClick={() => handleLetterClick('H')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faH} /></td>
            <td onClick={() => handleLetterClick('I')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faI} /></td>
            <td onClick={() => handleLetterClick('J')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faJ} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('K')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faK} /></td>
            <td onClick={() => handleLetterClick('L')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faL} /></td>
            <td onClick={() => handleLetterClick('M')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faM} /></td>
            <td onClick={() => handleLetterClick('N')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faN} /></td>
            <td onClick={() => handleLetterClick('O')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faO} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('P')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faP} /></td>
            <td onClick={() => handleLetterClick('R')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faR} /></td>
            <td onClick={() => handleLetterClick('S')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faS} /></td>
            <td onClick={() => handleLetterClick('T')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faT} /></td>
            <td onClick={() => handleLetterClick('U')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faU} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('V')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faV} /></td>
            <td onClick={() => handleLetterClick('W')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faW} /></td>
            <td onClick={() => handleLetterClick('X')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faX} /></td>
            <td onClick={() => handleLetterClick('Y')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faY} /></td>
            <td onClick={() => handleLetterClick('X')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faZ} /></td>
        </tr>
    </table>

);