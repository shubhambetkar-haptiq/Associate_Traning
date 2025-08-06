import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Brands = ({ onBrandClick }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      const uniqueBrands = [...new Set(data.products.map(p => p.brand))];
      setBrands(uniqueBrands);
    };

    fetchBrands();
  }, []);

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 4,
    },
  };

  return (
    <div className="p-4  bg-white rounded shadow-md">
      <h2 className="text-4xl font-semibold mb-20">Top Brands</h2>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        swipeable
        draggable
        arrows={false}
     
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={() => onBrandClick?.(brand)}
            className="cursor-pointer mx-2 flex justify-center items-center text-gray-400 text-4xl font-semibold rounded px-4 py-6 text-center transition duration-300"
          >
            {brand}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Brands;
