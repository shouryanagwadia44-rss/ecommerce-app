   import { Link } from 'react-router-dom';
   import { useAuth } from '../context/AuthContext';
   import { useCart } from '../context/CartContext';

   const Navbar = () => {
     const { user, logout } = useAuth();
     const { cart } = useCart();

     return (
       <nav className="flex items-center justify-between px-6 py-4 border-b">
         <Link to="/" className="font-bold text-xl">ShopApp</Link>

         <div className="flex items-center gap-6">
           <Link to="/products">Products</Link>
           <Link to="/cart">Cart ({cart.length})</Link>

           {user ? (
             <button onClick={logout} className="text-red-500">Logout</button>
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