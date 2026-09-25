import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createRazorpayOrder, verifyRazorpayPayment } from '../api/paymentApi';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateItem, removeItem } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const handleCheckout = async () => {
    const res = await createRazorpayOrder();
    const { orderId, amount, currency, keyId } = res.data;

    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: 'ShopApp',
      description: 'Order Payment',
      order_id: orderId,
      handler: async (response) => {
        await verifyRazorpayPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
        navigate('/order-success');
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: { color: '#2563eb' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

   if (cart.length === 0) {
     return (
       <div className="text-center mt-20">
         <p className="text-gray-500 text-lg">Your cart is empty</p>
         <a href="/products" className="text-blue-600 underline mt-2 inline-block">
           Browse products
         </a>
       </div>
     );
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
        <button
          onClick={handleCheckout}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;