import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface GDPRBannerProps {
  className?: string;
}

const GDPRBanner: React.FC<GDPRBannerProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-background border-t z-50 shadow-lg animate-slide-in ${className}`}>
      <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
          <a href="/privacy" className="text-primary hover:underline">Learn more</a>
        </p>
        <div className="flex gap-4">
          <Button onClick={acceptCookies} variant="default">Accept</Button>
          <Button onClick={() => setIsVisible(false)} variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GDPRBanner;
