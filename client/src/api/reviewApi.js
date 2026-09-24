   import API from './axios';

   export const createReview = (productId, rating, comment) =>
     API.post('/reviews', { productId, rating, comment });
   export const fetchProductReviews = (productId) => API.get(`/reviews/${productId}`);