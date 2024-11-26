const Design = require("../models/Design");
const Cart = require("../models/Cart");

const cloudinary = require("../services/Cloudinary");

exports.createDesign = async (req, res) => {
  try {
    const { userId, name, imageBase64, materials, designPrice } = req.body;

    if (!userId || !imageBase64 || !name || !materials || !designPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const uploadResult = await cloudinary.uploader.upload(imageBase64, {
      folder: "designs",
      transformation: [{ width: 2048, height: 1080, crop: "limit" }],
    });

    const newDesign = new Design({
      userId,
      name,
      image: uploadResult.secure_url,
      materials,
      designPrice,
    });

    await newDesign.save();

    res.status(201).json({
      message: "Design saved successfully and added to cart",
      design: newDesign,
    });
  } catch (error) {
    console.error("Error saving design:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllDesign = async (req, res) => {
  try {
    const designs = await Design.find().populate("userId", "username email");
    res.status(200).json({ designs });
  } catch (error) {
    console.error("Error fetching designs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDesignsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const designs = await Design.find({ userId }).populate(
      "userId",
      "username email"
    );

    if (!designs || designs.length === 0) {
      return res.status(404).json({ error: "No designs found for this user" });
    }

    res.status(200).json({ designs });
  } catch (error) {
    console.error("Error fetching designs by userId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const design = await Design.findById(id);
    if (!design) {
      return res.status(404).json({ error: "Design not found" });
    }

    design.status = status;
    await design.save();

    res.status(200).json({
      message: `Design status updated to ${status}`,
      design,
    });
  } catch (error) {
    console.error("Error updating design status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteDesign = async (req, res) => {
  try {
    const { designId, userId } = req.body;

    if (!designId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const design = await Design.findOne({ _id: designId, userId });

    if (!design) {
      return res
        .status(404)
        .json({ error: "Design not found or does not belong to this user" });
    }

    await Design.deleteOne({ _id: designId });

    await Cart.updateMany(
      { "items.productId": designId },
      { $pull: { items: { productId: designId } } }
    );

    res.status(200).json({
      message: "Design deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting design:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
