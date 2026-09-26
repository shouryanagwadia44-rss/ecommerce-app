   import { Link } from 'react-router-dom';

   const Home = () => {
     return (
       <div className="max-w-6xl mx-auto px-6 py-20 text-center">
         <h1 className="text-4xl font-bold mb-3 text-gray-800">Welcome to ShopApp</h1>
         <p className="text-gray-500 mb-8 text-lg">
           Find good products at fair prices.
         </p>
         <Link
           to="/products"
           className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
         >
           Shop Now
         </Link>
       </div>
     );
   };

   export default Home;