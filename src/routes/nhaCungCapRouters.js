const express = require("express");
const {
  createNhaCungCap,
  updateNhaCungCapById,
  getNhaCungCapById,
  getAllNhaCungCaps,
  deleteNhaCungCapById,
} = require("../controllers/nhaCungCapController");

const router = express.Router();

// Tạo mới một nhà cung cấp
router.post("/", createNhaCungCap);

// Lấy tất cả nhà cung cấp
router.get("/", getAllNhaCungCaps);

// Lấy một nhà cung cấp theo ID
router.get("/:id", getNhaCungCapById);

// Cập nhật nhà cung cấp theo ID
router.put("/:id", updateNhaCungCapById);

// Xóa một nhà cung cấp theo ID
router.delete("/:id", deleteNhaCungCapById);

module.exports = router;
