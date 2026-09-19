   import { BrowserRouter, Routes, Route } from 'react-router-dom';
   import Home from './pages/Home';
   import Signup from './pages/Signup';
   import Login from './pages/Login';
   import Products from './pages/Products';
   import ProductDetail from './pages/ProductDetail';

   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/login" element={<Login />} />
           <Route path="/products" element={<Products />} />
           <Route path="/products/:id" element={<ProductDetail />} />
         </Routes>
       </BrowserRouter>
     );
   }

   export default App;