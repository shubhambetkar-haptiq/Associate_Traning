import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import ReviewList from '../../Features/reviewList';
import { useSelector } from 'react-redux';

const SmartPhone = () => {
  const [laptops, setLaptops] = useState([]);
  const [review, setReview] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchTerm = useSelector((state) => state.search.searchTerm.toLowerCase());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/category/smartphones');
        const data = await res.json();
        setLaptops(data.products);
        setFilteredProducts(data.products);

        const Reviews = data.products.flatMap(product =>
          (product.reviews || []).map(review => ({
            ...review,
            productTitle: product.title,
          }))
        );
        setReview(Reviews.slice(0, 5));
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = laptops.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(laptops);
    }
  }, [searchTerm, laptops]);

  return (
    <div className='min-h-screen py-4 px-2 mx-auto'>
      <h2 className='text-4xl capitalize font-bold my-6'>Mobiles</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
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

      {/* <div className='py-20 px-2'>
        <h2 className='text-4xl font-semibold mb-10'>What Our Customers Say</h2>
        <ReviewList reviews={review} />
      </div> */}
    </div>
  );
};

export default SmartPhone;
