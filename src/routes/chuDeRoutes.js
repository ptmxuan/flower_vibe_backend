const express = require("express");
const {
  createChuDe,
  updateChuDe,
  getChuDeById,
  getAllChuDe,
  deleteChuDe,
} = require("../controllers/chuDeController");

const router = express.Router();

// Tạo mới một chủ đề
router.post("/", createChuDe);

// Lấy tất cả các chủ đề
router.get("/", getAllChuDe);

// Lấy tất 1 chủ đề
router.get("/:id", getChuDeById);

// Cập nhật tên chủ đề
router.put("/:id", updateChuDe);

// Xóa một chủ đề
router.delete("/:id", deleteChuDe);

module.exports = router;