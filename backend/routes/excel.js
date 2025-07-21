const express = require("express");
const router = express.Router();
const multer = require("multer");
const XLSX = require("xlsx");
const ExcelRecord = require("../models/ExcelRecord");

// ✅ Setup multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ✅ POST: Upload Excel file and save to MongoDB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const newRecord = new ExcelRecord({
      data: jsonData,
      // userId: req.user.id, // (optional)
    });

    await newRecord.save();

    console.log("✅ Excel data saved:", jsonData.length, "rows");
    res.status(200).json({ message: "File parsed and saved", rows: jsonData.length });
  } catch (err) {
    console.error("❌ Error while parsing/saving Excel:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ GET: Fetch all uploaded Excel records
router.get("/records", async (req, res) => {
  try {
    const records = await ExcelRecord.find().sort({ uploadedAt: -1 });
    res.status(200).json(records);
  } catch (err) {
    console.error(" Failed to fetch records:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

module.exports = router;
