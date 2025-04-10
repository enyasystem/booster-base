import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import React from 'react';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const enterpriseServices = [
  {
    title: 'Enterprise Software Development',
    description: 'Custom software solutions tailored to your business needs',
    icon: '💻'
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Scalable and secure cloud solutions for enterprise deployment',
    icon: '☁️'
  },
  {
    title: 'Digital Transformation',
    description: 'End-to-end digital transformation consulting and implementation',
    icon: '🔄'
  },
  {
    title: 'Enterprise Security',
    description: 'Comprehensive security solutions to protect your business assets',
    icon: '🔒'
  }
]

const Enterprise = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 mt-14">Enterprise Solutions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-800">Custom Business Solutions</h2>
              <p className="text-gray-700">
                We provide tailored enterprise solutions that help businesses streamline their operations,
                improve efficiency, and drive growth. Our expert team works closely with you to understand
                your unique challenges and deliver targeted solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-800">Our Enterprise Services</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Enterprise Resource Planning (ERP) Solutions</li>
                <li>• Cloud Infrastructure Management</li>
                <li>• Digital Transformation Consulting</li>
                <li>• Custom Software Development</li>
                <li>• IT Infrastructure Optimization</li>
                <li>• Cybersecurity Solutions</li>
              </ul>
            </div>
          </div>

          {/* Add Enterprise Services Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-12">Our Enterprise Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {enterpriseServices.map((service, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Transform Your Business?</h2>
            <Link to="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Enterprise;
