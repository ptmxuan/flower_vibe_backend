const ImportOrder = require("../models/ImportOrder");

const createImportOrder = async (req, res) => {
  const { supplierName, products, description } = req.body;

  try {
    // Kiểm tra đầu vào
    if (
      !supplierName ||
      !Array.isArray(products) || // Kiểm tra nếu products là mảng
      products.length === 0 || // Kiểm tra nếu mảng sản phẩm không rỗng
      !description
    ) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Kiểm tra từng sản phẩm trong mảng
    for (let product of products) {
      if (
        !product.productId ||
        !product.importPrice ||
        !product.quantity ||
        product.quantity <= 0 ||
        product.importPrice <= 0
      ) {
        return res.status(400).json({ message: "Invalid product data" });
      }
    }

    // Tạo phiếu nhập mới
    const importOrder = await ImportOrder.create({
      supplierName,
      products,
      description,
    });

    console.log("🚀 ~ createImportOrder ~ importOrder:", importOrder);

    return res.status(201).json(importOrder);
  } catch (error) {
    console.error("Error creating import order:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllImportOrders = async (req, res) => {
  try {
    const importOrders = await ImportOrder.find()
      .populate("products.productId", "name image category") // Populate tất cả các productId trong mảng
      .sort({ createdAt: -1 });

    return res.status(200).json(importOrders);
  } catch (error) {
    console.error("Error fetching import orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createImportOrder, getAllImportOrders };
