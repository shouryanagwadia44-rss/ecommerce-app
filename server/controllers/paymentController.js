   const Razorpay = require('razorpay');
   const crypto = require('crypto');
   const User = require('../models/User');
   const Order = require('../models/Order');

   const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_KEY_SECRET,
   });

   exports.createOrder = async (req, res) => {
     try {
       console.log('Route hit, user id:', req.user._id);
       const user = await User.findById(req.user._id).populate('cart.product');

       if (user.cart.length === 0) {
         return res.status(400).json({ message: 'Cart is empty' });
       }

       const totalAmount = user.cart.reduce(
         (sum, item) => sum + item.product.price * item.quantity,
         0
       );
       console.log('About to create razorpay order, amount:', totalAmount);
       const razorpayOrder = await razorpay.orders.create({
         amount: Math.round(totalAmount * 100),
         currency: 'INR',
         receipt: `receipt_${Date.now()}`,
       });

       res.json({
         orderId: razorpayOrder.id,
         amount: razorpayOrder.amount,
         currency: razorpayOrder.currency,
         keyId: process.env.RAZORPAY_KEY_ID,
       });
     } catch (err) {
       console.error('Create order error:', err);
       res.status(500).json({
         message: err.message || err?.error?.description || 'An unexpected error occurred',
         razorpayError: err.error || undefined,
       });
     }
   };

   exports.verifyPayment = async (req, res) => {
     try {
       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

       const generatedSignature = crypto
         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
         .update(`${razorpay_order_id}|${razorpay_payment_id}`)
         .digest('hex');

       if (generatedSignature !== razorpay_signature) {
         return res.status(400).json({ message: 'Payment verification failed' });
       }

       const user = await User.findById(req.user._id).populate('cart.product');

       const orderItems = user.cart.map((item) => ({
         product: item.product._id,
         quantity: item.quantity,
         price: item.product.price,
       }));

       const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

       const newOrder = await Order.create({
         user: req.user._id,
         items: orderItems,
         totalAmount,
         status: 'pending',
         paymentInfo: { id: razorpay_payment_id, status: 'paid' },
       });

       user.cart = [];
       await user.save();

       res.json({ message: 'Payment verified, order placed', orderId: newOrder._id });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };