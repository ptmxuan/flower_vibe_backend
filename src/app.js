require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const designRoutes = require("./routes/designRoutes");
const chuDeRoutes = require("./routes/chuDeRoutes");
const nhaCungCapRoutes = require("./routes/nhaCungCapRouters");
// const employeeRoutes = require("./routes/employeeRoutes");
// const rentalRoutes = require("./routes/rentalRoutes");
const app = express();

// Kết nối đến MongoDB
connectDB();

// Sử dụng middleware CORS
app.use(cors());

// Thiết lập các header COOP và COEP
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
//   res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
//   next();
// });

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Định nghĩa các routes
app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/designs", designRoutes);
app.use("/api/chu-de", chuDeRoutes);
app.use("/api/nha-cung-cap", nhaCungCapRoutes);
// app.use("/api/employee", employeeRoutes);
// app.use("/api/rental", rentalRoutes);

// Export app để server.js sử dụng
module.exports = app;
