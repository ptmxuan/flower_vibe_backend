const mongoose = require("mongoose");

const chuDeSchema = new mongoose.Schema({
  ten: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  sanPhams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChuDe", chuDeSchema);
