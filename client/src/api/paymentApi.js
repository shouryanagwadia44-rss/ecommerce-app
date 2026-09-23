   import API from './axios';

   export const createRazorpayOrder = () => API.post('/payments/create-order');
   export const verifyRazorpayPayment = (data) => API.post('/payments/verify', data);