const Property = require("../models/Property");

// Create
exports.createProperty = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.iconUrl = `/uploads/${req.file.filename}`;
    }
    const prop = new Property(data);
    const saved = await prop.save();

    res
      .status(201)
      .json({ message: "Property added successfully", data: saved });
  } catch (err) {
    next(err);
  }
};

// Get all
exports.getProperties = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { propertyName: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
      ];
    }

    const properties = await Property.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);
    if (!properties || properties.length === 0) {
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
      data: properties,
    });
  } catch (err) {
    next(err);
  }
};

// Get single Property
exports.getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prop = await Property.findById(id);
    if (!prop) return res.status(404).json({ message: "Property not found" });
    res.json(prop);
  } catch (err) {
    next(err);
  }
};

// Update
exports.updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (req.file) {
      updateData.iconUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property updated successfully", data: updated });
  } catch (err) {
    next(err);
  }
};

// Delete
exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const del = await Property.findByIdAndDelete(id);
    if (!del) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
};
