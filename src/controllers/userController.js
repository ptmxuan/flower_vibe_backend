const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
//dang ky
exports.registerUser = async (req, res) => {
  try {
    const { name, phone, gender, username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const user = new User({
      name,
      phone,
      gender,
      username,
      password: hashedPassword,
      role: "user",
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Đăng nhập
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm người dùng theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }

    // Tạo JWT token khi đăng nhập thành công
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "4h" } // Token có hiệu lực trong 1 giờ
    );

    // Trả về thông tin người dùng (trừ mật khẩu) và token
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userData,
      token,
    });
    console.log("Đăng nhập", { user: userData, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Cập nhật thông tin người dùng
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, phone, gender, username } = req.body;

    // Tìm người dùng theo userId
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Cập nhật các trường thông tin
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.username = username || user.username;

    // Lưu lại thông tin cập nhật
    await user.save();

    // Trả về thông tin đã cập nhật
    const { password, ...updatedUserData } = user.toObject();
    res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUserData,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Cập nhật mật khẩu
exports.changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Tìm người dùng theo userId
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Mật khẩu hiện tại không đúng" });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới
    user.password = hashedPassword;

    // Lưu lại mật khẩu mới
    await user.save();

    res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllUsers = async (req, res) => {
  console.log("getAllUsers");
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "Xóa người dùng thành công",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
