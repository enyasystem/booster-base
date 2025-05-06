import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    title: "Professional IT Training",
    description: "Expert-led training programs to enhance your technical skills",
    image: "/ICT Training.jpg",
    link: "/training",
    linkText: "View Courses"
  },
  {
    title: "Enterprise Solutions",
    description: "Custom solutions for businesses of all sizes",
    image: "/AI_Brain.jpg",
    link: "/enterprise",
    linkText: "Learn More"
  },
  {
    title: "Premium IT Products",
    description: "Discover our wide range of high-quality computers, networking equipment, and security solutions",
    image: "/slider-4.jpg",
    link: "/products",
    linkText: "View Products"
  }
];

const CarouselHero = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-r from-blue-900 to-blue-800">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex flex-col-reverse md:flex-row h-full w-full">
              {/* Text Content */}
              <div className="relative w-full md:w-2/5 flex flex-col justify-center px-4 md:px-8 lg:px-12 py-8 md:py-0 text-white z-10 bg-gradient-to-t md:bg-none from-blue-900/80 via-blue-900/60 to-transparent">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 max-w-xl">
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                    {slide.linkText}
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="relative w-full md:w-3/5 h-64 md:h-full flex items-center justify-center overflow-hidden bg-blue-950">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-auto h-full max-h-[90%] object-contain md:rounded-none rounded-t-lg md:rounded-l-lg transition-all duration-300 bg-blue-950 mx-auto"
                  style={{ background: '#0f172a' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-900/0 pointer-events-none"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselHero;
// image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
// image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
// image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
