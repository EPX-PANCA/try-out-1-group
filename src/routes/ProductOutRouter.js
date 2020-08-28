const express = require("express");
const router = express.Router();

const ProductOutController = require("../controllers/ProductOutController");
const auth = require("../middleware/middleAuth");


router.get("/", auth, ProductOutController.getProductOutAll);
router.get("/:id", auth, ProductOutController.getProductOutId);
router.post("/", auth, ProductOutController.saveProductOut);
router.put("/:id", auth, ProductOutController.updateProductOut);
router.delete("/:id", auth, ProductOutController.deleteProductOut);

module.exports = router;