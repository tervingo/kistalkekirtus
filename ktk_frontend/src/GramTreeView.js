import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import './tkk.css';


const TreeNode = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="tree-view">
      <div className={`collapsible ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
      {label}
      </div>
      <div className={`content ${isOpen ? 'active' : 'nested'}`}>{children}</div>
    </div>
  );
};

const MorphoNode = () => (
  <TreeNode label="Kistalketa">
    <Link className="tree-list" to="/html-display/NOM_ANI_DECLENSION">Nominal Animate Declension</Link>
    <Link className="tree-list" to="/html-display/NOM_INA_DECLENSION">Nominal Inanimate Declension</Link>
  </TreeNode>
);

/* const SyntaxNode = () => (
  <TreeNode label="Konota">
    <Link className="tree-list" to="/list-roots">Uilen konoi salli</Link>
    <Link className="tree-list" to="/enter-root">Unnen konova aunilli</Link>
    <Link className="tree-list" to="/query-root">Konoiva massi</Link>
  </TreeNode>
);

const PhonoNode = () => (
  <TreeNode label="Eltonsjusta">
    <Link className='tree-list' to="/export/csv">CSV oinilli</Link>
    <Link className='tree-list' to="/export/pdf" >PDF oinilli</Link>
    <Link className='tree-list' to="import/csv" >CSV aunilli</Link>
    <Link className='tree-list' to="/csv-info" >CSV aro</Link>
  </TreeNode>
); */


export const GramTreeView = ({ GramNavigateOnMount, setGramNavigateOnMount }) => {
  const location = useLocation();

  useEffect(() => {
    if (GramNavigateOnMount) {
      setGramNavigateOnMount(false);
    }
  }, [location]);

  console.log('GTV: GramNavigateOnMount is: ', GramNavigateOnMount);

  return (
    <div>
      <MorphoNode />
      {GramNavigateOnMount && <Navigate to="/html-display/NOM_ANI_DECLENSION" />}
    </div>
  );
};