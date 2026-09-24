   import API from './axios';

   export const fetchMyOrders = () => API.get('/orders/my-orders');
   export const fetchAllOrders = () => API.get('/orders/all');
   export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });