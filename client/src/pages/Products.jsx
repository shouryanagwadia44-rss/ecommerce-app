   import { useState, useEffect } from 'react';
   import { fetchProducts } from '../api/productApi';
   import ProductCard from '../components/ProductCard';

   const Products = () => {
     const [products, setProducts] = useState([]);
     const [search, setSearch] = useState('');
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [loading, setLoading] = useState(true);

   useEffect(() => {
     const loadProducts = async () => {
       setLoading(true);
       const res = await fetchProducts({ search, page });
       setProducts(res.data.products);
       setTotalPages(res.data.pages);
       setLoading(false);
     };
     loadProducts();
   }, [search, page]);

     return (
   <div className="max-w-6xl mx-auto p-6">
     <h1 className="text-2xl font-bold mb-5 text-gray-800">All Products</h1>
   <input
     type="text"
     placeholder="Search products..."
     value={search}
     onChange={(e) => { setSearch(e.target.value); setPage(1); }}
     className="w-full mb-6 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
   />

   {loading ? (
     <p className="text-center text-gray-500 py-10">Loading products...</p>
   ) : products.length === 0 ? (
     <p className="text-center text-gray-500 py-10">No products found</p>
   ) : (
     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
       {products.map((p) => (
         <ProductCard key={p._id} product={p} />
       ))}
     </div>
   )}

         <div className="flex justify-center gap-4 mt-6">
           <button
             disabled={page === 1}
             onClick={() => setPage((p) => p - 1)}
             className="px-4 py-2 border rounded disabled:opacity-40"
           >
             Prev
           </button>
           <span>Page {page} of {totalPages}</span>
           <button
             disabled={page === totalPages}
             onClick={() => setPage((p) => p + 1)}
             className="px-4 py-2 border rounded disabled:opacity-40"
           >
             Next
           </button>
         </div>
       </div>
     );
   };

   export default Products;