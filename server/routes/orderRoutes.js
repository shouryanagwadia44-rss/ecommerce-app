   const express = require('express');
   const router = express.Router();
   const {
     getMyOrders,
     getOrderById,
     getAllOrders,
     updateOrderStatus,
   } = require('../controllers/orderController');
   const { protect, isAdmin } = require('../middleware/authMiddleware');

   router.get('/my-orders', protect, getMyOrders);
   router.get('/all', protect, isAdmin, getAllOrders);
   router.get('/:id', protect, getOrderById);
   router.put('/:id/status', protect, isAdmin, updateOrderStatus);

   module.exports = router;