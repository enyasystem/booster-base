import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { StarIcon } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  course: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Developer",
    image: "/testimonials/student1.jpg",
    quote: "The training at Booster Base transformed my career. The practical approach and industry-relevant curriculum helped me secure my dream job.",
    rating: 5,
    course: "Full Stack Development",
    company: "Microsoft Nigeria"
  },
  {
    id: 2,
    name: "Michael Okonkwo",
    role: "Network Engineer",
    image: "/testimonials/student2.jpg",
    quote: "The hands-on experience with enterprise networking equipment was invaluable. The instructors are highly knowledgeable and supportive.",
    rating: 5,
    course: "Network Administration",
    company: "MTN Nigeria"
  },
  {
    id: 3,
    name: "Amina Ibrahim",
    role: "Cybersecurity Analyst",
    image: "/testimonials/student3.jpg",
    quote: "Booster Base's cybersecurity program provided me with real-world skills and certifications that set me apart in the job market.",
    rating: 5,
    course: "Cybersecurity Fundamentals",
    company: "Access Bank"
  },
  {
    id: 4,
    name: "David Adeleke",
    role: "Cloud Solutions Architect",
    image: "/testimonials/student4.jpg",
    quote: "The AWS certification training was comprehensive and practical. I'm now leading cloud migration projects at my organization.",
    rating: 5,
    course: "AWS Cloud Architecture",
    company: "Flutterwave"
  },
  {
    id: 5,
    name: "Grace Oluwaseun",
    role: "Data Scientist",
    image: "/testimonials/student5.jpg",
    quote: "The data science bootcamp exceeded my expectations. The project-based learning approach helped me build a strong portfolio.",
    rating: 5,
    course: "Data Science Bootcamp",
    company: "Paystack"
  },
  {
    id: 6,
    name: "Hassan Mohammed",
    role: "DevOps Engineer",
    image: "/testimonials/student6.jpg",
    quote: "Learning DevOps practices and tools at Booster Base was a game-changer. The real-world projects prepared me for industry challenges.",
    rating: 5,
    course: "DevOps Engineering",
    company: "Interswitch"
  }
];

const TestimonialCarousel = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Alumni
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers through our training programs
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="testimonial-carousel !pb-14"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                      <StarIcon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-blue-600">{testimonial.company}</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 mb-6 flex-grow italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {testimonial.course}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
