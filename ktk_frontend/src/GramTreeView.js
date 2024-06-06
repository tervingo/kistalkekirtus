import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const MorphNomNode = () =>{
  const { t } = useTranslation();
  return (
    <TreeNode label={t('gram.morph.nom.label')}>
      <Link className="tree-list" to="/html-display/NOM_ANI_DECLENSION">{t('gram.morph.nom.aniDeclension')}</Link>
      <Link className="tree-list" to="/html-display/NOM_INA_DECLENSION">{t('gram.morph.nom.inaDeclension')}</Link>
      <Link className="tree-list" to="/html-display/NOM_ROOT_DECLENSION">{t('gram.morph.nom.rootDeclension')}</Link>
    </TreeNode>
  );
};

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
      <MorphNomNode />
      {GramNavigateOnMount && <Navigate to="/html-display/NOM_ANI_DECLENSION" />}
    </div>
  );
};