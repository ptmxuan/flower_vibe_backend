// orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route to create a new order
router.post("/", orderController.createOrder);

// Route to get all orders
router.get("/:userId", orderController.getAllOrders);
router.get("/", orderController.getAllOrdersWithoutUserId);
// Route to get a specific order by ID
router.get("/:id", orderController.getOrderById);

// Route to update an order's status
router.put("/update/:orderId", orderController.updateOrderStatus);

// Route to delete an order by ID
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
