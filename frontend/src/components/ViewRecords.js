// src/components/ViewRecords.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/excel/records")
      .then(res => setRecords(res.data))
      .catch(err => console.error("Error fetching records:", err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Uploaded Excel Data</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        records.map((record, index) => (
          <div key={record._id} style={{ marginBottom: "30px" }}>
            <h3>📁 Record {index + 1}</h3>
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  {Object.keys(record.data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {record.data.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => (
                      <td key={j}>{val}</td>
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
}

export default ViewRecords;
