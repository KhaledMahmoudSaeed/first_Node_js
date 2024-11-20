const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

router.patch("/send-verification-code", authController.signout);// there error when using this uri
module.exports = router;
