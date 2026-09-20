   const User = require('../models/User');

   exports.getCart = async (req, res) => {
     try {
       const user = await User.findById(req.user._id).populate('cart.product');
       res.json(user.cart);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.addToCart = async (req, res) => {
     try {
       const { productId, quantity } = req.body;
       const user = await User.findById(req.user._id);

       const existingItem = user.cart.find((item) => item.product.toString() === productId);

       if (existingItem) {
         existingItem.quantity += quantity || 1;
       } else {
         user.cart.push({ product: productId, quantity: quantity || 1 });
       }

       await user.save();
       const updatedUser = await User.findById(req.user._id).populate('cart.product');
       res.json(updatedUser.cart);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.updateCartItem = async (req, res) => {
     try {
       const { quantity } = req.body;
       const user = await User.findById(req.user._id);

       const item = user.cart.find((item) => item.product.toString() === req.params.productId);
       if (!item) return res.status(404).json({ message: 'Item not in cart' });

       item.quantity = quantity;
       await user.save();

       const updatedUser = await User.findById(req.user._id).populate('cart.product');
       res.json(updatedUser.cart);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.removeFromCart = async (req, res) => {
     try {
       const user = await User.findById(req.user._id);
       user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
       await user.save();

       const updatedUser = await User.findById(req.user._id).populate('cart.product');
       res.json(updatedUser.cart);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };