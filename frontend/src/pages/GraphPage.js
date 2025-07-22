import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function GraphPage() {
  const [data, setData] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/excel/records")
      .then(res => {
        const latest = res.data[0]; // get the most recent record
        if (latest && latest.data.length > 0) {
          setData(latest.data);
          setFields(Object.keys(latest.data[0]));
        }
      })
      .catch(err => console.error("❌ Failed to fetch records:", err));
  }, []);

  const generateChartData = () => {
    return {
      labels: data.map(item => item[xAxis]),
      datasets: [
        {
          label: `${yAxis} by ${xAxis}`,
          data: data.map(item => item[yAxis]),
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📊 Generate Chart</h2>

      {fields.length > 0 ? (
        <>
          <label>Select X-axis: </label>
          <select onChange={e => setXAxis(e.target.value)} value={xAxis}>
            <option value="">-- Select --</option>
            {fields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>

          <label style={{ marginLeft: "20px" }}>Select Y-axis: </label>
          <select onChange={e => setYAxis(e.target.value)} value={yAxis}>
            <option value="">-- Select --</option>
            {fields.map(field => (
              <option key={field} value={field}>{field}</option>
            ))}
          </select>

          <div style={{ marginTop: "30px" }}>
            {xAxis && yAxis ? (
              <Bar data={generateChartData()} />
            ) : (
              <p>⬅️ Please select both X and Y axes.</p>
            )}
          </div>
        </>
      ) : (
        <p>📂 No data available to plot.</p>
      )}
    </div>
  );
}

export default GraphPage;
