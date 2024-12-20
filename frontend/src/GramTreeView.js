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

const MorphVerbNode = () =>{
  const { t } = useTranslation();
  return (
    <TreeNode label={t('gram.morph.verb.label')}>
      <Link className="tree-list" to="/html-display/VERB_ACT_PRES">{t('gram.morph.verb.actPres')}</Link>
      <Link className="tree-list" to="/html-display/VERB_PAS_PRES">{t('gram.morph.verb.pasPres')}</Link>
      <Link className="tree-list" to="/html-display/VERB_ACT_PAST">{t('gram.morph.verb.actPast')}</Link>
      <Link className="tree-list" to="/html-display/VERB_PAS_PAST">{t('gram.morph.verb.pasPast')}</Link>
      </TreeNode>
  );
};

export const GramTreeView = ({ GramNavigateOnMount, setGramNavigateOnMount }) => {
  const location = useLocation();

  useEffect(() => {
    if (GramNavigateOnMount) {
      setGramNavigateOnMount(false);
    }
  }, [location, setGramNavigateOnMount, GramNavigateOnMount]);

  return (
    <div>
      <MorphNomNode />
      <MorphVerbNode />
      {GramNavigateOnMount && <Navigate to="/html-display/NOM_ANI_DECLENSION" />}
    </div>
  );
};