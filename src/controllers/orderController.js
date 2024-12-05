// orderController.js
const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, customer, userId, orderDate, deliveryTime } = req.body;

    if (
      (!items && items.length > 0) ||
      !customer ||
      !userId ||
      !orderDate ||
      !deliveryTime
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = new Order({
      userId,
      items: items.map((item) => ({
        productId: item.productId,
        itemType: item.itemType,
        quantity: item.quantity,
        price: item.gia,
      })),
      customer,
      orderDate,
      deliveryTime,
    });
    console.log("order", order);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all orders (không phân biệt userId)
exports.getAllOrdersWithoutUserId = async (req, res) => {
  try {
    const orders = await Order.find(); // Lấy tất cả đơn hàng mà không phân biệt userId
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status by ID
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ URL
  const { status } = req.body; // Lấy status từ request body

  try {
    // Cập nhật chỉ trường status của đơn hàng
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Trả về đối tượng đã cập nhật
    );

    // Nếu không tìm thấy đơn hàng, trả về lỗi 404
    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    console.log("updatedOrder", updatedOrder);
    // Phản hồi đơn hàng đã cập nhật
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
