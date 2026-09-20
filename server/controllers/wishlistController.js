   const User = require('../models/User');

   exports.getWishlist = async (req, res) => {
     try {
       const user = await User.findById(req.user._id).populate('wishlist');
       res.json(user.wishlist);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.toggleWishlist = async (req, res) => {
     try {
       const { productId } = req.body;
       const user = await User.findById(req.user._id);

       const alreadyIn = user.wishlist.some((id) => id.toString() === productId);

       if (alreadyIn) {
         user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
       } else {
         user.wishlist.push(productId);
       }

       await user.save();
       const updatedUser = await User.findById(req.user._id).populate('wishlist');
       res.json(updatedUser.wishlist);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };