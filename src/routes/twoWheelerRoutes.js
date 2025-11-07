const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/twoWheelerController");
const upload = require("../middlewares/upload");
router.get("/", ctrl.getAllTwoWheelers);
router.get("/:id", ctrl.getTwoWheelerById);
router.post("/", upload.single("imageUrl"), ctrl.addTwoWheeler);
router.put("/:id", upload.single("imageUrl"), ctrl.editTwoWheeler);
router.delete("/:id", ctrl.deleteTwoWheeler);

module.exports = router;
