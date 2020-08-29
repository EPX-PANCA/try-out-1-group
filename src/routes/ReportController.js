const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/ReportController");
const auth = require("../middleware/middleAuth");


router.get("/:id", auth, UsersController.getUserId);

 
module.exports = router;
