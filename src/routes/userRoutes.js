const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

// Đăng nhập
router.post("/login", loginUser);
// Cập nhật thông tin người dùng
router.put("/:id", updateUserProfile);
// Define the registration route
router.post("/", registerUser);
// Thay đổi mật khẩu
router.put("/:id/change-password", changePassword);

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
module.exports = router;
