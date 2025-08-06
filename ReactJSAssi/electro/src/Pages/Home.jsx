import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner/Banner';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  const selectedCategories = [
    "laptops",
    "smartphones",
    "tablets",
    "mens-watches",
    "womens-watches",
    "mobile-accessories"
  ];

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const allProducts = [];

        for (const category of selectedCategories) {
          const res = await fetch(`https://dummyjson.com/products/category/${category}`);
          const data = await res.json();
          allProducts.push(data.products[0]); 
          // console.log(data)// push all products in that category
        }

        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductsByCategory();
  }, []);

  return (
    <div className='mb-10 min-h-screen'>
      <Banner />
      <div className='py-4 px-2'>
        <h2 className='text-4xl py-2 mb-4 font-bold'> Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 '>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* <div className='py-4'>
          <Brands/>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
