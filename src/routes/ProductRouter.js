const express = require("express");
const router = express.Router();


const ProductController = require("../controllers/ProductController");
const auth = require("../middleware/middleAuth");


router.get("/", auth, ProductController.getProductAll);
router.get("/:id", auth, ProductController.getProductId);
router.post("/", auth, ProductController.saveProduct);
router.put("/:id", auth, ProductController.updateProduct);
router.delete("/:id", auth, ProductController.deleteProduct);

module.exports = router;