const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema();

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
