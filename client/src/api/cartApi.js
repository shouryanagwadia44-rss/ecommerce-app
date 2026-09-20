   import API from './axios';

   export const fetchCart = () => API.get('/cart');
   export const addToCart = (productId, quantity = 1) => API.post('/cart', { productId, quantity });
   export const updateCartItem = (productId, quantity) => API.put(`/cart/${productId}`, { quantity });
   export const removeFromCart = (productId) => API.delete(`/cart/${productId}`);