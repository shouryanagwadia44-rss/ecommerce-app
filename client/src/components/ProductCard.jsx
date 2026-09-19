   import { Link } from 'react-router-dom';

   const ProductCard = ({ product }) => {
     return (
       <Link
         to={`/products/${product._id}`}
         className="border rounded-lg p-3 hover:shadow-md transition"
       >
         <img
           src={product.images?.[0] || 'https://via.placeholder.com/200'}
           alt={product.name}
           className="w-full h-40 object-cover rounded"
         />
         <h3 className="mt-2 font-semibold">{product.name}</h3>
         <p className="text-gray-600">₹{product.price}</p>
       </Link>
     );
   };

   export default ProductCard;