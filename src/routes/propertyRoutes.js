const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/propertyController");
const upload = require("../middlewares/upload");
router.post("/", upload.single("iconUrl"), ctrl.createProperty);
router.get("/", ctrl.getProperties);
router.get("/:id", ctrl.getPropertyById);
router.put("/:id", upload.single("iconUrl"), ctrl.updateProperty);
router.delete("/:id", ctrl.deleteProperty);

module.exports = router;
