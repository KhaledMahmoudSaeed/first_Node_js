const express = require("express");
const router = express.Router();
const postcontroller = require("../controllers/postController");
router.get("/index", postcontroller.index);
router.get("/show", postcontroller.show);
router.post("/store", postcontroller.store);
router.patch("/update", postcontroller.update);
router.delete("/delete", postcontroller.delete);
module.exports = router;
