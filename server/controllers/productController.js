   const Product = require('../models/Product');

   exports.createProduct = async (req, res) => {
     try {
       const { name, description, price, category, stock } = req.body;
       const imageUrls = req.files ? req.files.map((file) => file.path) : [];

       const product = await Product.create({
         name,
         description,
         price,
         category,
         stock,
         images: imageUrls,
         seller: req.user._id,
       });

       res.status(201).json(product);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.getProducts = async (req, res) => {
     try {
       const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

       let filter = {};
       if (search) filter.name = { $regex: search, $options: 'i' };
       if (category) filter.category = category;
       if (minPrice || maxPrice) {
         filter.price = {};
         if (minPrice) filter.price.$gte = Number(minPrice);
         if (maxPrice) filter.price.$lte = Number(maxPrice);
       }

       const products = await Product.find(filter)
         .populate('category', 'name')
         .skip((page - 1) * limit)
         .limit(Number(limit));

       const total = await Product.countDocuments(filter);

       res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.getProductById = async (req, res) => {
     try {
       const product = await Product.findById(req.params.id).populate('category', 'name');
       if (!product) return res.status(404).json({ message: 'Product not found' });
       res.json(product);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.updateProduct = async (req, res) => {
     try {
       const product = await Product.findById(req.params.id);
       if (!product) return res.status(404).json({ message: 'Product not found' });

       Object.assign(product, req.body);
       await product.save();
       res.json(product);
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };

   exports.deleteProduct = async (req, res) => {
     try {
       const product = await Product.findById(req.params.id);
       if (!product) return res.status(404).json({ message: 'Product not found' });

       await product.deleteOne();
       res.json({ message: 'Product deleted' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };