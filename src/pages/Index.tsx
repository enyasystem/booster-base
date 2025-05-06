import { lazy, Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { AnimatePresence } from 'framer-motion';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GDPRBanner from '@/components/GDPRBanner';
import { Loader2 } from 'lucide-react';
import CompanyHistory from '@/components/home/CompanyHistory';
import CoreValues from '@/components/home/CoreValues';
import TrainingSection from '@/components/home/TrainingSection';
import NewsPreview from '@/components/home/NewsPreview';
import ContactSection from '@/components/home/ContactSection';
import RecommendedProducts from '@/components/home/RecommendedProducts';
import ClientsSection from '@/components/home/ClientsSection';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GoToTop from '@/components/GoToTop';
import ProductSidebar from '@/components/sidebar/ProductSidebar';
import CarouselHero from '@/components/CarouselHero';
import YouTubeSection from '@/components/home/YouTubeSection';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import LoadingScreen from '@/components/LoadingScreen';
import BlogSection from '@/components/home/BlogSection';

// Remove this interface as it's not being used in this file

const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Preload critical images
        const criticalImages = [
          '/logo.png',
          '/og-image.png',
          // Add other important images
        ];

        await Promise.all([
          // Preload critical images
          ...criticalImages.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          }),
          // Wait for visible images to load
          ...Array.from(document.images)
            .filter(img => !img.complete)
            .map(img => new Promise(resolve => {
              img.onload = img.onerror = resolve;
            })),
          // Minimum loading time
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    // Start preloading immediately
    preloadImages();

    return () => setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
    
      
      <div className="relative min-h-screen flex flex-col">
        <Helmet>
          <title>Booster Base Nigeria Limited - Leading ICT Solutions Provider in Plateau State, Jos</title>
          <meta name="description" content="Booster Base Nigeria Limited is a leading ICT solutions provider offering comprehensive technology services, training, and innovative solutions across Nigeria." />
          <meta name="keywords" content="ICT solutions, technology services, IT training, Nigeria, Jos, software development, network infrastructure" />
          <link rel="canonical" href="https://boosterbaseng.com" />
          
          <meta property="og:title" content="Booster Base Nigeria Limited - Leading ICT Solutions Provider" />
          <meta property="og:description" content="Comprehensive ICT solutions and training services in Nigeria" />
          <meta property="og:image" content="/og-image.png" />
          <meta property="og:url" content="https://boosterbaseng.com" />
          
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Booster Base Nigeria Limited" />
          <meta name="twitter:description" content="Leading ICT Solutions Provider in Nigeria" />
          <meta name="twitter:image" content="/og-image.png" />
          
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Booster Base Nigeria Limited",
              "url": "https://boosterbaseng.com",
              "logo": "/logo.png",
              "description": "Leading ICT solutions provider in Nigeria",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "No. 1 Hwoll, Behind Vochmal Petro Station, Zaria Road, Farin Gada",
                "addressLocality": "Jos",
                "addressRegion": "Plateau State",
                "addressCountry": "Nigeria"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-803-891-3567",
                "contactType": "customer service",
                "email": "info@boosterbaseng.com"
              },
              "sameAs": [
                "https://facebook.com/boosterbaseng",
                "https://twitter.com/boosterbaseng",
                "https://linkedin.com/company/boosterbaseng"
              ]
            })}
          </script>

          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2d89ef" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>

        <Navigation />
        
        {/* Modified layout container */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr] w-full">
          {/* Main content area */}
          <main className="w-full overflow-x-hidden pt-[72px] md:pt-[112px]">
            <CarouselHero />
            <Suspense fallback={<SectionLoader />}>
              <CoreValues />
              <CompanyHistory />
              <ClientsSection />
              <TrainingSection />
              <TestimonialCarousel />

              <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                    Explore Our Products
                  </h2>
                  
                  <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
                    Discover our comprehensive range of ICT solutions
                  </p>

                  <RecommendedProducts />

                  <div className="mt-12 flex justify-center">
                    <Link 
                      to="/products" 
                      className="inline-block"
                    >
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View All Products
                      </Button>
                    </Link>
                  </div>
                </div>
              </section>

              <YouTubeSection />
              <ContactSection />
            </Suspense>
          </main>

          {/* Sidebar */}
          {/* <aside className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <ProductSidebar />
          </aside> */}
        </div>

        <Footer />
        <GDPRBanner className="fixed bottom-0 left-0 right-0 z-50" />
        <GoToTop className="fixed bottom-20 right-4 md:right-6 z-40" />
      </div>
    </>
  );
};

export default Index;
