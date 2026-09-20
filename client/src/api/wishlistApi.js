   import API from './axios';

   export const fetchWishlist = () => API.get('/wishlist');
   export const toggleWishlist = (productId) => API.post('/wishlist', { productId });