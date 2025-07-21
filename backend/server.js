require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

console.log("⏳ Loading Excel routes..."); // Add this
const excelRoutes = require("./routes/excel");
app.use("/api/excel", excelRoutes);




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(process.env.PORT || 3001, () => {
      console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));
