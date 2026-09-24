   const Order = require('../models/Order');

   exports.getMyOrders = async (req, res) => {
     try {
       const orders = await Order.find({ user: req.user._id })
         .populate('items.product')
         .sort({ createdAt: -1 });
       res.json(orders);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.getOrderById = async (req, res) => {
     try {
       const order = await Order.findById(req.params.id).populate('items.product');
       if (!order) return res.status(404).json({ message: 'Order not found' });
       res.json(order);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.getAllOrders = async (req, res) => {
     try {
       const orders = await Order.find()
         .populate('user', 'name email')
         .populate('items.product')
         .sort({ createdAt: -1 });
       res.json(orders);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.updateOrderStatus = async (req, res) => {
     try {
       const { status } = req.body;
       const order = await Order.findById(req.params.id);
       if (!order) return res.status(404).json({ message: 'Order not found' });

       order.status = status;
       await order.save();
       res.json(order);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };