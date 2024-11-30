// Import the NhaCungCap model
const NhaCungCap = require("../models/NhaCungCap");

// Create a new Nhà Cung Cấp
exports.createNhaCungCap = async (req, res) => {
  try {
    const newNhaCungCap = new NhaCungCap(req.body);
    const savedNhaCungCap = await newNhaCungCap.save();
    res.status(201).json(savedNhaCungCap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Nhà Cung Cấp
exports.getAllNhaCungCaps = async (req, res) => {
  try {
    const nhaCungCaps = await NhaCungCap.find();
    res.status(200).json(nhaCungCaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Nhà Cung Cấp by ID
exports.getNhaCungCapById = async (req, res) => {
  try {
    const nhaCungCap = await NhaCungCap.findById(req.params.id);
    if (!nhaCungCap) return res.status(404).json({ message: "Not found" });
    res.status(200).json(nhaCungCap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Nhà Cung Cấp by ID
exports.updateNhaCungCapById = async (req, res) => {
  try {
    const updatedNhaCungCap = await NhaCungCap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNhaCungCap)
      return res.status(404).json({ message: "Not found" });
    res.status(200).json(updatedNhaCungCap);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Nhà Cung Cấp by ID
exports.deleteNhaCungCapById = async (req, res) => {
  try {
    const deletedNhaCungCap = await NhaCungCap.findByIdAndDelete(req.params.id);
    if (!deletedNhaCungCap)
      return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
