   import { Link } from 'react-router-dom';

   const ProductCard = ({ product }) => {
     return (
       <Link
         to={`/products/${product._id}`}
         className="border rounded-lg p-3 hover:shadow-lg transition block bg-white"
       >
         <img
           src={product.images?.[0] || 'https://via.placeholder.com/200'}
           alt={product.name}
           className="w-full h-40 object-cover rounded-md"
         />
         <h3 className="mt-3 font-semibold text-gray-800">{product.name}</h3>
         <p className="text-blue-600 font-medium mt-1">₹{product.price}</p>
       </Link>
     );
   };

   export default ProductCard;