const FourWheeler = require("../models/FourWheeler");

// Add Four Wheeler
exports.addFourWheeler = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.imageUrl = `/uploads/${req.file.filename}`;
    }
    const car = new FourWheeler(data);
    const saved = await car.save();
    res
      .status(201)
      .json({ message: "Four wheeler added successfully", data: saved });
  } catch (err) {
    next(err);
  }
};

// Get All
exports.getAllFourWheelers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { vehicleName: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }
    const cars = await FourWheeler.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    const total = await FourWheeler.countDocuments(filter);
    if (!cars || cars.length === 0) {
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
      data: cars,
    });
  } catch (err) {
    next(err);
  }
};

// Get One
exports.getFourWheelerById = async (req, res, next) => {
  try {
    const car = await FourWheeler.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    next(err);
  }
};

// Edit
exports.editFourWheeler = async (req, res, next) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await FourWheeler.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Four wheeler updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteFourWheeler = async (req, res, next) => {
  try {
    const deleted = await FourWheeler.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Four wheeler deleted successfully" });
  } catch (err) {
    next(err);
  }
};
