const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/fourWheelerController");
const upload = require("../middlewares/upload");
router.get("/", ctrl.getAllFourWheelers);
router.get("/:id", ctrl.getFourWheelerById);
router.post("/", upload.single("imageUrl"), ctrl.addFourWheeler);
router.put("/:id", upload.single("imageUrl"), ctrl.editFourWheeler);
router.delete("/:id", ctrl.deleteFourWheeler);

module.exports = router;
