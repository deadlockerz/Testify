const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use your actual secret key
// const cors = require('cors'); // Add CORS support
const router = express.Router();

// router.use(express.json()); // Middleware for parsing JSON bodies
// router.use(cors()); // Enable CORS

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.cartItems.map(item => ({
        price_data: {
          currency: 'inr', // Ensure currency is correct
          product_data: {
            name: item.course_name,
          },
          unit_amount: item.course_price, // Ensure price is in smallest currency unit
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed. Please try again later.' });
  }
});

module.exports = router;
