import React, { useEffect, useState } from 'react';
import { SERVER_IP } from './constants';

export function ImportCsvForm() {
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        fetch(`${SERVER_IP}/api/import/csv`, {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      };

    return (
      <form>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Upload CSV</button>
      </form>
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
      <p>Modified Date: {info.modified_date}</p>
      <p>Number of Rows: {info.num_rows}</p>
    </div>
  );
}

