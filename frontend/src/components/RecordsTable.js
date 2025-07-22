// src/components/RecordsTable.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const RecordsTable = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/excel/records");
      setRecords(res.data);
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
  };

  return (
    <div>
      <h2>📄 Uploaded Excel Data</h2>
      {records.length === 0 ? (
        <p>No records uploaded yet.</p>
      ) : (
        records.map((record, index) => (
          <div key={record._id}>
            <h3>📁 Record {index + 1}</h3>
            <table border="1" cellPadding={5} cellSpacing={0}>
              <thead>
                <tr>
                  {Object.keys(record.data[0]).map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {record.data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default RecordsTable;
