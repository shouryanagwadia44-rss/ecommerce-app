   import { useState, useEffect } from 'react';
   import { fetchAllOrders, updateOrderStatus } from '../api/orderApi';

   const AdminDashboard = () => {
     const [orders, setOrders] = useState([]);

     useEffect(() => {
       loadOrders();
     }, []);

     const loadOrders = async () => {
       const res = await fetchAllOrders();
       setOrders(res.data);
     };

     const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

     const handleStatusChange = async (orderId, newStatus) => {
       await updateOrderStatus(orderId, newStatus);
       loadOrders();
     };

     return (
       <div className="max-w-5xl mx-auto p-6">
         <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

         <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="border rounded-lg p-4">
             <p className="text-gray-500 text-sm">Total Orders</p>
             <p className="text-2xl font-bold">{orders.length}</p>
           </div>
           <div className="border rounded-lg p-4">
             <p className="text-gray-500 text-sm">Total Revenue</p>
             <p className="text-2xl font-bold">₹{totalRevenue}</p>
           </div>
         </div>

         <h2 className="text-xl font-bold mb-4">All Orders</h2>

         {orders.map((order) => (
           <div key={order._id} className="border rounded-lg p-4 mb-3">
             <div className="flex justify-between items-center">
               <div>
                 <p className="font-semibold">{order.user?.name}</p>
                 <p className="text-sm text-gray-500">{order.user?.email}</p>
               </div>
               <p className="font-semibold">₹{order.totalAmount}</p>
             </div>

             <div className="mt-3 flex items-center gap-3">
               <span className="text-sm">Status:</span>
               <select
                 value={order.status}
                 onChange={(e) => handleStatusChange(order._id, e.target.value)}
                 className="border rounded p-1 text-sm"
               >
                 <option value="pending">Pending</option>
                 <option value="shipped">Shipped</option>
                 <option value="delivered">Delivered</option>
                 <option value="cancelled">Cancelled</option>
               </select>
             </div>
           </div>
         ))}
       </div>
     );
   };

   export default AdminDashboard;