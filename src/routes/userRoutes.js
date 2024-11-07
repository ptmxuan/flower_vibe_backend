const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Đăng nhập
router.post("/login", loginUser);
// Define the registration route
router.post("/", registerUser);

module.exports = router;
