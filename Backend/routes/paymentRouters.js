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


// Create a new payment
router.post('/payments', async (req, res) => {
  try {
    const { userId, courseId, amount, paymentMethod, transactionId } = req.body;

    const payment = new Payment({
      userId,
      courseId,
      amount,
      paymentMethod,
      transactionId,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get payment details by ID
router.get('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('userId courseId');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find().populate('userId courseId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update payment status
router.put('/payments/:id', async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment status updated successfully', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a payment
router.delete('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
