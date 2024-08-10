const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

router.post("/cart/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const existingCartItem = await Cart.findOne({ courseId });
    if (existingCartItem) {
      return res.status(400).send({ message: "Course already in cart" });
    }

    const cartItem = new Cart({ courseId });
    const addedItem = await cartItem.save();
    res.status(201).send(addedItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/showcartitem", async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate("courseId");
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/removefromcart/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
