   import { Link } from 'react-router-dom';
   import { useAuth } from '../context/AuthContext';
   import { useCart } from '../context/CartContext';

   const Navbar = () => {
     const { user, logout } = useAuth();
     const { cart } = useCart();

     return (
   <nav className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b bg-white">
     <Link to="/" className="font-bold text-xl text-blue-600">ShopApp</Link>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap text-sm sm:text-base">
           <Link to="/products">Products</Link>
           <Link to="/cart">Cart ({cart.length})</Link>
           <Link to="/orders">Orders</Link>
           {user?.role === 'admin' && <Link to="/admin">Admin</Link>}

   {user ? (
   <button onClick={logout} className="text-red-500 hover:text-red-600">Logout</button>
   ) : (
             <>
               <Link to="/login">Login</Link>
               <Link to="/signup">Sign up</Link>
             </>
           )}
         </div>
       </nav>
     );
   };

   export default Navbar;