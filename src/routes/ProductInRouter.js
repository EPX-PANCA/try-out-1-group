const express = require("express");
const router = express.Router();

const ProductInController = require("../controllers/ProductInController");
const auth = require("../middleware/middleAuth");


router.get("/", auth, ProductInController.getProductInAll);
router.get("/:id", auth, ProductInController.getProductId);
router.post("/", auth, ProductInController.saveProductIn);
router.put("/:id", auth, ProductInController.updateProductIn);
router.delete("/:id", auth, ProductInController.deleteProductIn);

module.exports = router;