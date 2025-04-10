import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-[144px] md:pt-[120px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
