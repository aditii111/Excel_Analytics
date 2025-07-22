// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/excel/records");
        setRecords(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch records:", err);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2> Uploaded Excel Data</h2>
      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No records uploaded yet.</p>
      ) : (
        records.map((record, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h4>📁 Record {index + 1}</h4>
            <table border="1" cellPadding="5">
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

export default Dashboard;
