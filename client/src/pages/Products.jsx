   import { useState, useEffect } from 'react';
   import { fetchProducts } from '../api/productApi';
   import ProductCard from '../components/ProductCard';

   const Products = () => {
     const [products, setProducts] = useState([]);
     const [search, setSearch] = useState('');
     const [page, setPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);

     useEffect(() => {
       const loadProducts = async () => {
         const res = await fetchProducts({ search, page });
         setProducts(res.data.products);
         setTotalPages(res.data.pages);
       };
       loadProducts();
     }, [search, page]);

     return (
       <div className="max-w-6xl mx-auto p-6">
         <input
           type="text"
           placeholder="Search products..."
           value={search}
           onChange={(e) => { setSearch(e.target.value); setPage(1); }}
           className="w-full mb-6 p-2 border rounded"
         />

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
           {products.map((p) => (
             <ProductCard key={p._id} product={p} />
           ))}
         </div>

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