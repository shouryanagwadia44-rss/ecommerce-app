   import { createContext, useContext, useState, useEffect } from 'react';
   import { fetchCart, addToCart as addToCartApi, updateCartItem as updateCartApi, removeFromCart as removeFromCartApi } from '../api/cartApi';
   import { useAuth } from './AuthContext';

   const CartContext = createContext();

   export const CartProvider = ({ children }) => {
     const [cart, setCart] = useState([]);
     const { user } = useAuth();

     useEffect(() => {
       if (user) loadCart();
     }, [user]);

     const loadCart = async () => {
       const res = await fetchCart();
       setCart(res.data);
     };

     const addItem = async (productId, quantity = 1) => {
       const res = await addToCartApi(productId, quantity);
       setCart(res.data);
     };

     const updateItem = async (productId, quantity) => {
       const res = await updateCartApi(productId, quantity);
       setCart(res.data);
     };

     const removeItem = async (productId) => {
       const res = await removeFromCartApi(productId);
       setCart(res.data);
     };

     return (
       <CartContext.Provider value={{ cart, addItem, updateItem, removeItem }}>
         {children}
       </CartContext.Provider>
     );
   };

   export const useCart = () => useContext(CartContext);