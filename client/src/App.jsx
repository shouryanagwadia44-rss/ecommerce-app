   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import Home from './pages/Home';
   import Signup from './pages/Signup';
   import Login from './pages/Login';
   import Products from './pages/Products';
   import ProductDetail from './pages/ProductDetail';
   import Cart from './pages/Cart';
   import Navbar from './components/Navbar';

   function App() {
     return (
       <BrowserRouter>
          <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/products" element={<Products />} />
           <Route path="/products/:id" element={<ProductDetail />} />
           <Route path="/cart" element={<Cart />} />
         </Routes>
       </BrowserRouter>
     );
   }

   export default App;