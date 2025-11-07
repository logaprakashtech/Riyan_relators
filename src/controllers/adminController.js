const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1hr" }
  );
};

exports.registerAdmin = async (req, res, next) => {
  try {
    const { name, mobile, password, role } = req.body;

    const exists = await Admin.findOne({ mobile });
    if (exists)
      return res
        .status(400)
        .json({ message: "Mobile number already registered" });
    if (role === "primary") {
      const primaryExists = await Admin.findOne({ role: "primary" });
      if (primaryExists) {
        return res.status(400).json({
          message:
            "Primary admin already exists. You cannot create another admin.",
        });
      }
    }
    const admin = await Admin.create({ name, mobile, password, role });

    res.status(201).json({
      message: "Admin registered successfully",
      data: {
        id: admin._id,
        name: admin.name,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    const admin = await Admin.findOne({ mobile });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: " invalid credentials" });
    const token = generateToken(admin);
    res.json({
      message: "Login successful",
      token,
      data: {
        id: admin._id,
        name: admin.name,
        mobile: admin.mobile,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    next(err);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const deleted = await Admin.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    next(err);
  }
};
