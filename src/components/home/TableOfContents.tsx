
import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const TableOfContents = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-background/80 backdrop-blur-sm rounded-lg shadow-lg p-4">
          <ul className="space-y-2 text-sm">
            {['services', 'industries', 'about', 'news', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className="text-muted-foreground hover:text-foreground capitalize transition-colors"
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg transition-opacity duration-300 hover:bg-primary/90 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default TableOfContents;
