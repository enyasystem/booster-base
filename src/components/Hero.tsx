
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          <div className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-8 md:p-12 min-h-screen md:min-h-0 flex flex-col justify-center">
            {/* Grid pattern overlay for the text section only */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.2
            }}></div>
            
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200 animate-fade-in relative">
              Leading ICT & Engineering Solutions
            </span>
            
            <h1 className="mt-10 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-slide-in relative">
              Empowering Digital <br />
              <span className="text-blue-300">Transformation</span> in Nigeria
            </h1>
            
            <p className="mt-10 text-lg sm:text-xl text-blue-100 animate-slide-in relative" style={{animationDelay: '0.2s'}}>
              Booster Base delivers cutting-edge ICT solutions and engineering services, 
              helping businesses thrive in the digital age since 2003.
            </p>
            
            <div className="mt-14 flex flex-wrap gap-4 animate-slide-in relative" style={{animationDelay: '0.3s'}}>
              <Link to="/services" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all flex items-center gap-2 font-medium">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="px-6 py-3 bg-transparent border border-blue-400 text-blue-100 hover:bg-blue-800/30 rounded-md transition-all font-medium">
                Contact Us
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-24 grid grid-cols-3 gap-8 animate-slide-in relative" style={{animationDelay: '0.4s'}}>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-300">20+</div>
                <div className="mt-1 text-sm sm:text-base text-blue-200/80">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-300">500+</div>
                <div className="mt-1 text-sm sm:text-base text-blue-200/80">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-300">98%</div>
                <div className="mt-1 text-sm sm:text-base text-blue-200/80">Client Satisfaction</div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Digital Transformation" 
              className="w-full h-full object-cover"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 75% 100%, 0% 100%)',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Blue glow effects for the text section */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>
    </section>
  );
};

export default Hero;
