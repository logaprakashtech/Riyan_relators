const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/adminController");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.post("/register", ctrl.registerAdmin);
router.post("/login", ctrl.loginAdmin);

router.get("/", protect, restrictTo("primary"), ctrl.getAllAdmins);
router.delete("/:id", protect, restrictTo("primary"), ctrl.deleteAdmin);

module.exports = router;
