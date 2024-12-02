const mongoose = require("mongoose");

const order = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: "books",
    required: true,
  },
  status: {
    type: String,
    default: "Order Placed",
    enum: ["Order Placed", "Out for delivery", "Delivered", "Canceled"],
  },
}, { timestamps: true });

module.exports = mongoose.model("order", order);
