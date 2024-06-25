import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faR, faS, faT, faU, faV, faW, faX, faY, faZ, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

export const LetterTable = ({ handleLetterClick, handleScrollToTop, handleScrollToBottom }) => (
    <table className='letter-table'>
         <tr>
            <td colspan="5" align="right" onClick={() => handleScrollToTop()} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faArrowUp}/></td>
        </tr>
         <tr>
            <td onClick={() => handleLetterClick('a')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faA} /></td>
            <td onClick={() => handleLetterClick('b')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faB} /></td>
            <td onClick={() => handleLetterClick('c')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faC} /></td>
            <td onClick={() => handleLetterClick('d')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faD} /></td>
            <td onClick={() => handleLetterClick('e')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faE} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('f')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faF} /></td>
            <td onClick={() => handleLetterClick('g')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faG} /></td>
            <td onClick={() => handleLetterClick('h')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faH} /></td>
            <td onClick={() => handleLetterClick('i')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faI} /></td>
            <td onClick={() => handleLetterClick('j')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faJ} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('k')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faK} /></td>
            <td onClick={() => handleLetterClick('l')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faL} /></td>
            <td onClick={() => handleLetterClick('m')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faM} /></td>
            <td onClick={() => handleLetterClick('n')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faN} /></td>
            <td onClick={() => handleLetterClick('o')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faO} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('p')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faP} /></td>
            <td onClick={() => handleLetterClick('r')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faR} /></td>
            <td onClick={() => handleLetterClick('s')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faS} /></td>
            <td onClick={() => handleLetterClick('t')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faT} /></td>
            <td onClick={() => handleLetterClick('u')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faU} /></td>
        </tr>
        <tr>
            <td onClick={() => handleLetterClick('v')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faV} /></td>
            <td onClick={() => handleLetterClick('w')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faW} /></td>
            <td onClick={() => handleLetterClick('x')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faX} /></td>
            <td onClick={() => handleLetterClick('y')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faY} /></td>
            <td onClick={() => handleLetterClick('x')}  style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faZ} /></td>
        </tr>
        <tr>
            <td colspan="5" align="right" onClick={() => handleScrollToBottom()} style={{cursor: 'pointer'}}><FontAwesomeIcon icon={faArrowDown}/></td>
        </tr>
   </table>

);