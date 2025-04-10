import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';

type ProductCategory = {
  name: string;
  products: Array<{
    name: string;
    description: string;
  }>;
};

const categories: ProductCategory[] = [
  {
    name: "ICT Infrastructure",
    products: [
      {
        name: "Network Solutions",
        description: "Enterprise-grade networking infrastructure and solutions"
      },
      {
        name: "Server Systems",
        description: "High-performance server systems for various applications"
      },
      {
        name: "Data Centers",
        description: "Reliable and scalable data center solutions"
      },
      {
        name: "Cloud Services",
        description: "Flexible and secure cloud services for businesses"
      }
    ]
  },
  {
    name: "Software Solutions",
    products: [
      {
        name: "Enterprise Software",
        description: "Comprehensive software solutions for enterprises"
      },
      {
        name: "Custom Applications",
        description: "Tailored software applications to meet specific needs"
      },
      {
        name: "Mobile Apps",
        description: "Innovative mobile applications for various platforms"
      },
      {
        name: "System Integration",
        description: "Seamless integration of different software systems"
      }
    ]
  },
  {
    name: "Security Systems",
    products: [
      {
        name: "Cybersecurity",
        description: "Advanced cybersecurity solutions to protect your business"
      },
      {
        name: "CCTV Systems",
        description: "High-quality CCTV systems for surveillance"
      },
      {
        name: "Access Control",
        description: "Secure access control systems for your premises"
      },
      {
        name: "Firewalls",
        description: "Robust firewall solutions to safeguard your network"
      }
    ]
  },
  {
    name: "Business Solutions",
    products: [
      {
        name: "ERP Systems",
        description: "Integrated ERP systems for efficient business management"
      },
      {
        name: "CRM Solutions",
        description: "Effective CRM solutions to manage customer relationships"
      },
      {
        name: "Business Intelligence",
        description: "Data-driven business intelligence solutions"
      },
      {
        name: "Digital Transformation",
        description: "Comprehensive digital transformation services"
      }
    ]
  },
  {
    name: "Training Resources",
    products: [
      {
        name: "IT Certification",
        description: "Professional IT certification programs"
      },
      {
        name: "Technical Training",
        description: "Hands-on technical training for IT professionals"
      },
      {
        name: "Software Skills",
        description: "Training programs to enhance software skills"
      },
      {
        name: "Professional Development",
        description: "Resources for continuous professional development"
      }
    ]
  },
  {
    name: "Hardware Products",
    products: [
      {
        name: "Workstations",
        description: "High-performance workstations for demanding tasks"
      },
      {
        name: "Servers",
        description: "Reliable servers for various applications"
      },
      {
        name: "Network Equipment",
        description: "Advanced network equipment for seamless connectivity"
      },
      {
        name: "Storage Solutions",
        description: "Scalable storage solutions for data management"
      }
    ]
  },
  {
    name: "Support Services",
    products: [
      {
        name: "Maintenance Plans",
        description: "Comprehensive maintenance plans for your IT infrastructure"
      },
      {
        name: "Technical Support",
        description: "Expert technical support services"
      },
      {
        name: "Managed Services",
        description: "Proactive managed services for your IT needs"
      },
      {
        name: "Consulting",
        description: "Professional consulting services for IT projects"
      }
    ]
  }
];

interface ProductSidebarProps {
  className?: string;
}

const ProductSidebar: React.FC<ProductSidebarProps> = ({ className }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <aside className={className}>
      <div className="sticky top-0 bg-blue-50/95 backdrop-blur-md p-4 border-b border-blue-100 z-10 mt-8">
        <h2 className="text-xl font-bold text-blue-800">Our Products</h2>
        <p className="text-sm text-blue-600/80">Browse our solutions</p>
      </div>

      <nav className="p-4 space-y-2">
        {categories.map((category) => (
          <div key={category.name} className="rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.name ? null : category.name
              )}
              className="w-full flex items-center justify-between p-3 hover:bg-blue-100/50 rounded-lg transition-all duration-200"
            >
              <span className="font-medium text-blue-900">{category.name}</span>
              {expandedCategory === category.name ? (
                <ChevronDown className="w-4 h-4 text-blue-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-blue-600" />
              )}
            </button>

            {expandedCategory === category.name && (
              <div className="ml-4 mt-1 space-y-1">
                {category.products.map((product) => (
                  <div key={product.name}>
                    <button
                      onClick={() => setSelectedProduct(
                        selectedProduct === product.name ? null : product.name
                      )}
                      className={`w-full text-left p-2 rounded-md text-sm transition-all duration-200 ${
                        selectedProduct === product.name
                          ? 'bg-blue-200/50 text-blue-800'
                          : 'hover:bg-blue-100/30 text-blue-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span>{product.name}</span>
                      </div>
                    </button>

                    {selectedProduct === product.name && (
                      <div className="ml-6 mt-2 p-3 bg-white/50 rounded-md border border-blue-100">
                        <p className="text-sm text-blue-700">{product.description}</p>
                        <Link
                          to={`/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="mt-2 inline-block text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-blue-50/95 to-transparent">
        <Link 
          to="/products" 
          className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-md transition-colors duration-200 shadow-sm"
        >
          View All Products
        </Link>
      </div>
    </aside>
  );
};

export default ProductSidebar;
