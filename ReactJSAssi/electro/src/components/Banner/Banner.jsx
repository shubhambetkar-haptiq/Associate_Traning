import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Banner = () => {

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const images = [
    'Images/banner.png',
    'Images/banner2.png',
    'Images/banner3.png',
    'Images/la.png',
  ];

  return (
  <Carousel
  responsive={responsive}
  infinite
  autoPlay
  autoPlaySpeed={3000}
  swipeable
  draggable

>
  {images.map((src, index) => (
    <div key={index} className="w-full">
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        className="w-full lg:h-[1000px] h-full md:h-[500px] object-cover overflow-hidden"
      />
    </div>
  ))}
</Carousel>


  );
};

export default Banner;
