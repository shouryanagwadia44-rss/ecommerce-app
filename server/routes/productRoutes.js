   const express = require('express');
   const router = express.Router();
   const {
     createProduct,
     getProducts,
     getProductById,
     updateProduct,
     deleteProduct,
   } = require('../controllers/productController');
   const { protect } = require('../middleware/authMiddleware');
   const upload = require('../middleware/uploadMiddleware');

   router.get('/', getProducts);
   router.get('/:id', getProductById);
   router.post('/', protect, upload.array('images', 5), createProduct);
   router.put('/:id', protect, updateProduct);
   router.delete('/:id', protect, deleteProduct);

   module.exports = router;