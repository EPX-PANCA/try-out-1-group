const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UserController");
const auth = require("../middleware/middleAuth");

router.get("/", auth, UsersController.getUserAll);
router.get("/:id", auth, UsersController.getUserId);
router.post("/", auth, UsersController.saveUser);
router.put("/:id", auth, UsersController.updateUser);
router.delete("/:id", auth, UsersController.deleteUser);

module.exports = router;
