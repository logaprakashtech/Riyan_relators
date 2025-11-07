const mongoose = require("mongoose");

const FourWheelerSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  description: { type: String },
  location: { type: String,required: true, trim: true },
  fuelType: { type: String,required: true, trim: true },
  kmDriven: { type: String, required: true,trim: true },
  year: { type: Number ,required: true},
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FourWheeler", FourWheelerSchema);
