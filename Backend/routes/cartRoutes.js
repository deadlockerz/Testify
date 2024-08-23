const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

router.post("/cart/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body; // Extract userId from the request body

  try {
    const existingCartItem = await Cart.findOne({ courseId, userId });
    if (existingCartItem) {
      return res.status(400).send({ message: "Course already in cart" });
    }

    const cartItem = new Cart({ courseId, userId }); // Include userId when creating the new cart item
    const addedItem = await cartItem.save();
    res.status(201).send(addedItem);
  } catch (e) {
    res.status(500).send(e);
  }
});

//show all cart items 
router.get("/showcartitem", async (req, res) => {
  const { userId } = req.query; // Extract userId from query parameters
  try {
    const cartItems = await Cart.find({ userId }).populate("courseId"); // Filter by userId
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(500).send(error);
  }
});


//delete item from cart
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
