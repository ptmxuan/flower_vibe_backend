// Import the Product model
const Product = require("../models/Product");
const ChuDe = require("../models/ChuDe");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy tất cả sản phẩm và thông tin chủ đề tương ứng
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        // Bước 1: Thực hiện join giữa Product và ChuDe
        $lookup: {
          from: "chudes", // Tên của collection ChuDe trong MongoDB
          localField: "_id", // Trường _id trong bảng Product
          foreignField: "sanPhams", // Trường sanPhams trong bảng ChuDe (chứa id sản phẩm)
          as: "chuDes", // Đặt tên mảng chứa thông tin chủ đề sau khi join
        },
      },
      {
        // Bước 2: Chọn lại các trường cần thiết (tuỳ vào yêu cầu của bạn)
        $project: {
          _id: 1,
          hinh: 1,
          hinhdang: 1,
          mau: 1,
          ten: 1,
          gia: 1,
          rate: 1,
          quantity: 1,
          description: 1,
          detailDescription: 1,
          phantramgiamgia: 1,
          luotmua: 1,
          chuDes: 1, // Chỉ lấy thông tin chủ đề đã được join
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update quantity of a product by ID
exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;

  // Kiểm tra xem quantity có hợp lệ hay không
  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ message: "Invalid quantity value" });
  }

  try {
    // Cập nhật số lượng cho sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, // ID của sản phẩm
      { quantity }, // Cập nhật chỉ trường quantity
      { new: true, runValidators: true } // Trả về đối tượng mới sau khi cập nhật
    );

    // Kiểm tra nếu sản phẩm không tồn tại
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("updatedProduct", updatedProduct);
    // Trả về sản phẩm đã được cập nhật
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({ message: error.message });
  }
};
