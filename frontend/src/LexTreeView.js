import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './tkk.css';
import './i18n';


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

const EntriesNode = () => {
  const { t } = useTranslation(); // Define 't' here

  return (
    <TreeNode label={t('lex.entries.label')}>
      <Link className="tree-list" to="/list-entries">{t('lex.entries.listEntries.label')}</Link>
      <Link className="tree-list" to="/enter-entry">{t('lex.entries.enterEntry')}</Link>
      <Link className="tree-list" to="/query-entry">{t('lex.entries.queryEntries')}</Link>
    </TreeNode>
  );
};


const RootsNode = () =>  {
  const { t } = useTranslation(); // Define 't' here

  return (
    <TreeNode label={t('lex.roots.label')} >
      <Link className="tree-list" to="/list-roots">{t('lex.roots.listRoots.label')} </Link>
      <Link className="tree-list" to="/enter-root">{t('lex.roots.enterRoot')} </Link>
      <Link className="tree-list" to="/query-root">{t('lex.roots.queryRoots')} </Link>
    </TreeNode>
  );
};

const FilesNode = () => {
  const { t } = useTranslation(); // Define 't' here

  return (
    <TreeNode label= {t('lex.files.label')}>
      <Link className='tree-list' to="/export-csv"> {t('lex.files.exportCSV')}</Link>
      <Link className='tree-list' to="/export-pdf" >{t('lex.files.exportPDF')}</Link>
    </TreeNode>
  );
};


export const LexTreeView = ({ LexNavigateOnMount, setLexNavigateOnMount }) => {
  const location = useLocation();

  useEffect(() => {
    if (LexNavigateOnMount) {
      setLexNavigateOnMount(false);
    }
  }, [location, LexNavigateOnMount, setLexNavigateOnMount]);

  return (
  <div>
    <EntriesNode />
    <RootsNode />
    <FilesNode />
    { LexNavigateOnMount && <Navigate to="/list-entries" replace={true} /> }
  </div>
  );
};