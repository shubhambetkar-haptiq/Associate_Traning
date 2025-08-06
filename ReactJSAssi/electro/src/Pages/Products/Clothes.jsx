import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import ReviewList from '../../Features/reviewList';
import { useSelector } from 'react-redux';

const Clothes = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const categories = ['mens-shirts', 'womens-dresses'];

  const searchTerm = useSelector((state) =>
    state.search.searchTerm?.toLowerCase() || ''
  );

  // Fetch data once
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
        const allReviews = allProducts.flatMap(product =>
          (product.reviews || []).map(review => ({
            ...review,
            productTitle: product.title,
          }))
        );

        setReviews(allReviews.slice(0, 5)); // Limit to top 5 reviews
      } catch (error) {
        console.error('Error fetching clothes data', error);
      }
    };

    fetchData();
  }, []);

  // Filter data on searchTerm change
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
      <h2 className="text-3xl font-semibold mb-6">Clothes</h2>

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

      <div className='py-20 px-2'>
        <h2 className='text-4xl font-semibold mb-10'>What Our Customers Say</h2>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default Clothes;
