import React, { useState } from "react";
import axios from "axios";

function UploadExcel() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:3001/api/excel/upload", formData);
      setParsedData(res.data.data || []); // optional if you send data back
      setMessage(res.data.message);
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("Failed to upload file");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Excel File</h2>
      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload} style={{ padding: "10px 20px" }}>
        Upload
      </button>
      <br /><br />

      {message && <p>{message}</p>}

      {parsedData.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <h3>Parsed Data:</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                {Object.keys(parsedData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsedData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, i) => (
                    <td key={i}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UploadExcel;
