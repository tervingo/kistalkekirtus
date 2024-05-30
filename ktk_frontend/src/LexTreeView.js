import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './tkk.css';


const TreeNode = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

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

const EntriesNode = () => (
  <TreeNode label="Kistalketa">
    <Link className="tree-list" to="/list-entries">Uilen kistalke salli</Link>
    <Link className="tree-list" to="/enter-entry">Unnen kistalkeva aunilli</Link>
    <Link className="tree-list" to="/query-entry">Kistalkeeva massi</Link>
  </TreeNode>
);

const RootsNode = () => (
  <TreeNode label="Konota">
    <Link className="tree-list" to="/list-roots">Uilen konoi salli</Link>
    <Link className="tree-list" to="/enter-root">Unnen konova aunilli</Link>
    <Link className="tree-list" to="/query-root">Konoiva massi</Link>
  </TreeNode>
);

const FilesNode = () => (
  <TreeNode label="Eltonsjusta">
    <Link className='tree-list' to="/export/csv">CSV oinilli</Link>
    <Link className='tree-list' to="/export/pdf" >PDF oinilli</Link>
    <Link className='tree-list' to="import/csv" >CSV aunilli</Link>
    <Link className='tree-list' to="/csv-info" >CSV aro</Link>
  </TreeNode>
);

export const LexTreeView = () => (
  <div>
    <EntriesNode />
    <RootsNode />
    <FilesNode />
  </div>
);

