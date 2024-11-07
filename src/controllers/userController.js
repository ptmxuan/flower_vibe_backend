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
        .json({ error: "Username or password is incorrect" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Username or password is incorrect" });
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
