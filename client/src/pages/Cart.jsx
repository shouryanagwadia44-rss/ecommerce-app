   import { useCart } from '../context/CartContext';

   const Cart = () => {
     const { cart, updateItem, removeItem } = useCart();

     const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

     if (cart.length === 0) {
       return <p className="text-center mt-10 text-gray-500">Your cart is empty</p>;
     }

     return (
       <div className="max-w-3xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

         {cart.map((item) => (
           <div key={item.product._id} className="flex items-center justify-between border-b py-4">
             <div className="flex items-center gap-4">
               <img
                 src={item.product.images?.[0] || 'https://via.placeholder.com/80'}
                 alt={item.product.name}
                 className="w-16 h-16 object-cover rounded"
               />
               <div>
                 <h3 className="font-semibold">{item.product.name}</h3>
                 <p className="text-gray-600">₹{item.product.price}</p>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <input
                 type="number"
                 min="1"
                 value={item.quantity}
                 onChange={(e) => updateItem(item.product._id, Number(e.target.value))}
                 className="w-16 border rounded p-1 text-center"
               />
               <button
                 onClick={() => removeItem(item.product._id)}
                 className="text-red-500 text-sm"
               >
                 Remove
               </button>
             </div>
           </div>
         ))}

         <div className="mt-6 text-right">
           <p className="text-xl font-bold">Total: ₹{total}</p>
           <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
             Proceed to Checkout
           </button>
         </div>
       </div>
     );
   };

   export default Cart;