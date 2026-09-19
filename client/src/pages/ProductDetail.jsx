   import { useState, useEffect } from 'react';
   import { useParams } from 'react-router-dom';
   import { fetchProductById } from '../api/productApi';

   const ProductDetail = () => {
     const { id } = useParams();
     const [product, setProduct] = useState(null);

     useEffect(() => {
       const loadProduct = async () => {
         const res = await fetchProductById(id);
         setProduct(res.data);
       };
       loadProduct();
     }, [id]);

     if (!product) return <p className="text-center mt-10">Loading...</p>;

     return (
       <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
         <img
           src={product.images?.[0] || 'https://via.placeholder.com/400'}
           alt={product.name}
           className="w-full rounded-lg object-cover"
         />
         <div>
           <h1 className="text-2xl font-bold">{product.name}</h1>
           <p className="text-gray-600 mt-2">{product.description}</p>
           <p className="text-xl font-semibold mt-4">₹{product.price}</p>
           <p className="text-sm text-gray-500 mt-1">In stock: {product.stock}</p>
           <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
             Add to Cart
           </button>
         </div>
       </div>
     );
   };

   export default ProductDetail;