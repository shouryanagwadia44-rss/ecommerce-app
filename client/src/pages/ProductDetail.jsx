import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/productApi';
import { useCart } from '../context/CartContext';
import { createReview, fetchProductReviews } from '../api/reviewApi';
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetchProductById(id);
      setProduct(res.data);
    };
    const loadReviews = async () => {
      const res = await fetchProductReviews(id);
      setReviews(res.data);
    };
    loadProduct();
    loadReviews();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await createReview(id, rating, comment);
    const res = await fetchProductReviews(id);
    setReviews(res.data);
    setComment('');
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <img
        src={product.images?.[0] || 'https://via.placeholder.com/400'}
        alt={product.name}
        className="w-full rounded-lg object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-4">₹{product.price}</p>
        <p className="text-sm text-gray-500 mt-1">In stock: {product.stock}</p>
        <button
          onClick={() => addItem(product._id, 1)}
          className="mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
      <div className="md:col-span-2 mt-10">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {reviews.map((r) => (
          <div key={r._id} className="border-b py-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{r.user.name}</span>
              <span className="text-yellow-500">{'★'.repeat(r.rating)}</span>
            </div>
            <p className="text-gray-600">{r.comment}</p>
          </div>
        ))}

        <form onSubmit={handleReviewSubmit} className="mt-6">
          <h3 className="font-semibold mb-2">Write a review</h3>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded p-2 mb-2"
          >
            <option value={5}>5 stars</option>
            <option value={4}>4 stars</option>
            <option value={3}>3 stars</option>
            <option value={2}>2 stars</option>
            <option value={1}>1 star</option>
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border rounded p-2 mb-2"
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;