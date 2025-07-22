// src/pages/DashboardPage.js
import React, { useState } from "react";
import UploadExcel from "../components/UploadExcel";
import FileUpload from "../components/FileUpload";
import GraphPage from "./GraphPage";
import RecordsTable from "../components/RecordsTable"; // ✅ You created this earlier
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>📊 Welcome to Your Dashboard</h1>

      <div style={{ marginBottom: "2rem" }}>
        <button onClick={() => setActiveSection("upload")}>Upload Excel File</button>
        <button onClick={() => setActiveSection("records")}>View Uploaded Records</button>
        <button onClick={() => setActiveSection("graph")}>Generate Graph</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {activeSection === "upload" && <UploadExcel />}
      {activeSection === "records" && <RecordsTable />}
      {activeSection === "graph" && <GraphPage />}
    </div>
  );
};

export default DashboardPage;
