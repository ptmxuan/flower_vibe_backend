const ToPic = require("../models/ChuDe");
const Product = require("../models/Product");

exports.createChuDe = async (req, res) => {
  try {
    const { ten, sanPhams } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ten) {
      return res.status(400).json({ error: "Tên chủ đề là bắt buộc" });
    }
    if (!sanPhams || !Array.isArray(sanPhams) || sanPhams.length === 0) {
      return res.status(400).json({ error: "Danh sách sản phẩm là bắt buộc" });
    }

    // Kiểm tra xem tên đã tồn tại hay chưa
    const existingChuDe = await ToPic.findOne({ ten: ten.trim() });
    if (existingChuDe) {
      return res.status(400).json({ error: "Tên chủ đề đã tồn tại" });
    }

    // Tạo chủ đề mới
    const newChuDe = new ToPic({
      ten: ten.trim(),
      sanPhams, // Lưu danh sách sản phẩm liên quan
    });

    await newChuDe.save();

    res.status(201).json({
      message: "Chủ đề được tạo thành công",
      chuDe: newChuDe,
    });
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy tất cả các chủ đề
exports.getAllChuDe = async (req, res) => {
  try {
    const chuDes = await ToPic.find().populate("sanPhams", "_id ten");

    const result = chuDes.map((chuDe) => ({
      id: chuDe._id,
      ten: chuDe.ten,
      sanPhams: chuDe.sanPhams.map((sp) => ({ id: sp._id, ten: sp.ten })),
    }));

    res.status(200).json({ chuDes: result });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy chủ đề theo ID
exports.getChuDeById = async (req, res) => {
  try {
    const { id } = req.params;

    const chuDe = await ToPic.findById(id).populate("sanPhams", "ten");

    if (!chuDe) {
      return res.status(404).json({ error: "Chủ đề không tồn tại" });
    }

    res.status(200).json({
      id: chuDe._id,
      ten: chuDe.ten,
      sanPhams: chuDe.sanPhams.map((sp) => sp.ten), // Lấy mảng tên sản phẩm
    });
  } catch (error) {
    console.error("Error fetching topic by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Cập nhật chủ đề
exports.updateChuDe = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten, sanPhams } = req.body; // Cập nhật tên và sản phẩm

    if (!ten) {
      return res.status(400).json({ error: "Tên chủ đề là bắt buộc" });
    }

    const chuDe = await ToPic.findById(id);

    if (!chuDe) {
      return res.status(404).json({ error: "Chủ đề không tồn tại" });
    }

    chuDe.ten = ten;

    if (sanPhams && Array.isArray(sanPhams)) {
      chuDe.sanPhams = sanPhams; // Lưu id sản phẩm
    }

    await chuDe.save();

    const updatedChuDe = await ToPic.findById(id).populate("sanPhams", "ten");

    res.status(200).json({
      message: "Cập nhật chủ đề thành công",
      chuDe: {
        id: updatedChuDe._id,
        ten: updatedChuDe.ten,
        sanPhams: updatedChuDe.sanPhams.map((sp) => sp.ten),
      },
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Xóa chủ đề
exports.deleteChuDe = async (req, res) => {
  try {
    const { id } = req.params;

    const chuDe = await ToPic.findById(id);

    if (!chuDe) {
      return res.status(404).json({ error: "Chủ đề không tồn tại" });
    }

    await chuDe.deleteOne();

    res.status(200).json({
      message: "Xóa chủ đề thành công",
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
