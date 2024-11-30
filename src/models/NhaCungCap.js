const mongoose = require("mongoose");

const nhaCungCapSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  diaChi: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NhaCungCap", nhaCungCapSchema);
