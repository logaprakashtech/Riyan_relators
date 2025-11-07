const TwoWheeler = require("../models/TwoWheeler");

// Add
exports.addTwoWheeler = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const bike = new TwoWheeler(data);
    const saved = await bike.save();
    res
      .status(201)
      .json({ message: "Two wheeler added successfully", data: saved });
  } catch (err) {
    next(err);
  }
};

// Get All
exports.getAllTwoWheelers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { vehicleName: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }
    const bikes = await TwoWheeler.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await TwoWheeler.countDocuments(filter);
    if (!bikes || bikes.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No data found",
        total: 0,
        page: parseInt(page),
        limit: parseInt(limit),
        data: [],
      });
    }
    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      data: bikes,
    });
  } catch (err) {
    next(err);
  }
};

// Get One
exports.getTwoWheelerById = async (req, res, next) => {
  try {
    const bike = await TwoWheeler.findById(req.params.id);
    if (!bike) return res.status(404).json({ message: "Bike not found" });
    res.json(bike);
  } catch (err) {
    next(err);
  }
};

// Edit
exports.editTwoWheeler = async (req, res, next) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await TwoWheeler.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Bike not found" });
    res.json({ message: "Two wheeler updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteTwoWheeler = async (req, res, next) => {
  try {
    const deleted = await TwoWheeler.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bike not found" });
    res.json({ message: "Two wheeler deleted successfully" });
  } catch (err) {
    next(err);
  }
};
