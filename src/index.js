require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");
const errorHandler = require("./middlewares/errorHandler");
const fourWheelerRoutes = require("./routes/fourWheelerRoutes");
const twoWheelerRoutes = require("./routes/twoWheelerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/properties", propertyRoutes);
app.get("/", (req, res) => res.send("Riyan Realeters API is running"));
app.use("/api/fourwheelers", fourWheelerRoutes);
app.use("/api/twowheelers", twoWheelerRoutes);
app.use("/api/admins", adminRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect DB", err);
  });
