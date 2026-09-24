   const Review = require('../models/Review');
   const Product = require('../models/Product');

   exports.createReview = async (req, res) => {
     try {
       const { productId, rating, comment } = req.body;

       const existing = await Review.findOne({ user: req.user._id, product: productId });
       if (existing) {
         return res.status(400).json({ message: 'You already reviewed this product' });
       }

       const review = await Review.create({
         user: req.user._id,
         product: productId,
         rating,
         comment,
       });

       const allReviews = await Review.find({ product: productId });
       const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

       await Product.findByIdAndUpdate(productId, { ratingsAverage: avgRating });

       res.status(201).json(review);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.getProductReviews = async (req, res) => {
     try {
       const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
       res.json(reviews);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };