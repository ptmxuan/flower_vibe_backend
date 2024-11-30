// Import mongoose
const mongoose = require("mongoose");

// Define the schema for the product data
const productSchema = new mongoose.Schema({
  hinh: {
    type: String,
    required: true,
  },
  ten: {
    type: String,
    required: true,
  },
  gia: {
    type: Number,
    required: true,
  },
  phantramgiamgia: {
    type: Number,
    required: true,
    default: 0,
  },
  luotmua: {
    type: Number,
    required: true,
    default: 0,
  },
  mau: {
    type: String,
    required: true,
  },
  hinhdang: {
    type: String,
    required: true,
  },
  chuDes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChuDe",
    },
  ],
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  detailDescription: {
    type: String,
    required: true,
  },
});

// Create and export the model
module.exports = mongoose.model("Product", productSchema);
