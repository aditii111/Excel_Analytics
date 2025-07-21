const mongoose = require("mongoose");

const ExcelRecordSchema = new mongoose.Schema({
  data: {
    type: Array,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
});

module.exports = mongoose.model("ExcelRecord", ExcelRecordSchema);
