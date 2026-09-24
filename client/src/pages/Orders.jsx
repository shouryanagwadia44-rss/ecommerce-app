   import { useState, useEffect } from 'react';
   import { fetchMyOrders } from '../api/orderApi';

   const Orders = () => {
     const [orders, setOrders] = useState([]);

     useEffect(() => {
       const loadOrders = async () => {
         const res = await fetchMyOrders();
         setOrders(res.data);
       };
       loadOrders();
     }, []);

     if (orders.length === 0) {
       return <p className="text-center mt-10 text-gray-500">No orders yet</p>;
     }

     return (
       <div className="max-w-4xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

         {orders.map((order) => (
           <div key={order._id} className="border rounded-lg p-4 mb-4">
             <div className="flex justify-between items-center mb-2">
               <span className="text-sm text-gray-500">
                 Order #{order._id.slice(-6)}
               </span>
               <span className="text-sm font-semibold capitalize px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                 {order.status}
               </span>
             </div>

             {order.items.map((item) => (
               <div key={item.product._id} className="flex justify-between text-sm py-1">
                 <span>{item.product.name} x {item.quantity}</span>
                 <span>₹{item.price * item.quantity}</span>
               </div>
             ))}

             <div className="text-right font-semibold mt-2">
               Total: ₹{order.totalAmount}
             </div>
           </div>
         ))}
       </div>
     );
   };

   export default Orders;