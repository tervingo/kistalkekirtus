import React, { useEffect, useState } from 'react';
import { SERVER_IP } from './constants';

export function ImportCsvForm() {
  const [message, setMessage] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleFileUpload = () => {
    if (window.confirm('Do you want to import the new CSV file?')) {
      fetch(`${SERVER_IP}/api/import/csv`, {
        method: 'POST',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
        setHasUploaded(true);
      })
      .catch(error => console.error(error));
    }
  };

  // Call handleFileUpload when the component is rendered
  useEffect(() => {
    if (!hasUploaded) {
      handleFileUpload();
    }
  }, []);

  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  );
};


export function CsvInfo() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`${SERVER_IP}/api/csv-info`)
      .then(response => response.json())
      .then(data => setInfo(data));
  }, []);

  console.log(info.modified_date)

  return (
    <div>
      <h3>Current CSV file info</h3>
      <p>Modified Date: {info.modified_date}</p>
      <p>Number of Entries: {info.num_entries}</p>
      <p>Root modified data: {info.root_modified_date} </p>
      <p>Number of Roots: {info.num_roots}</p>
      <h3>Last read CSV info at {info.hostname}</h3>
      <p>{info.last_date_info}</p>
      <p>{info.last_noe_info}</p>
      <p>{info.last_nor_info}</p>

    </div>
  );
}

