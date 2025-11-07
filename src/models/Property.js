const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  propertyName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  description: { type: String },
  location: { type: String, required: true, trim: true },
  size: { type: String, required: true },
  iconUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Property", PropertySchema);
