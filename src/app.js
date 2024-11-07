require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const employeeRoutes = require("./routes/employeeRoutes");
// const rentalRoutes = require("./routes/rentalRoutes");
const app = express();

// Kết nối đến MongoDB
connectDB();

// Sử dụng middleware CORS
app.use(cors());

// Thiết lập các header COOP và COEP
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

app.use(express.json());

// Định nghĩa các routes
app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/employee", employeeRoutes);
// app.use("/api/rental", rentalRoutes);

// Export app để server.js sử dụng
module.exports = app;
