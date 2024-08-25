const express = require("express");
const {signUpController , loginController } = require("../controllers/userController");
const router = express.Router();
router.route("/signup").post(signUpController);
router.route("/login").post(loginController);
module.exports = router;
