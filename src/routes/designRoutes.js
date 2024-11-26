const express = require("express");
const {
  createDesign,
  updateDesign,
  getAllDesign,
  getDesignsByUserId,
  deleteDesign,
} = require("../controllers/designController");

const router = express.Router();

router.post("/",createDesign);

router.get("/", getAllDesign);

router.get("/user/:userId", getDesignsByUserId);

router.put("/:id/status", updateDesign);

router.delete("/", deleteDesign);



module.exports = router;
