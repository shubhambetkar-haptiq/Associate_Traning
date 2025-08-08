import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ReviewList from '../../Features/reviewList';
import { useSelector } from 'react-redux';

const Watches = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const categories = ['mens-watches', 'womens-watches'];

  const searchTerm = useSelector((state) =>
    state.search.searchTerm?.toLowerCase() || ''
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allProducts = [];
        for (const category of categories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          allProducts = [...allProducts, ...data.products];
        }
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        // Extract reviews from all products
        
        
      } catch (error) {
        console.error("Error fetching watches data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-3xl font-semibold mb-6">Watches</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className='text-xl col-span-full text-center'>No matching products found.</p>
        )}
      </div>

      
    </div>
  );
};

export default Watches;
