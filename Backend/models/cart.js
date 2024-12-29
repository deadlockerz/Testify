const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Adding userId field
  quantity: { type: Number, default: 1 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
