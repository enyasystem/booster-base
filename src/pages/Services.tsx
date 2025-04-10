import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ServiceCategory from '@/components/services/ServiceCategory';
import ServiceDetail from '@/components/services/ServiceDetail';
import CaseStudy from '@/components/services/CaseStudy';

const Services = () => {
  const categories = [
    {
      id: 1,
      name: "Teleconferencing",
      description: "Advanced teleconferencing solutions for modern business communication",
      icon: "video"
    },
    {
      id: 2,
      name: "ICT Training",
      description: "Comprehensive HR development and technology adaptation programs",
      icon: "graduation-cap"
    },
    {
      id: 3,
      name: "VSAT Installation",
      description: "Professional satellite communication systems and maintenance",
      icon: "satellite-dish"
    },
    {
      id: 4,
      name: "IT Hardware",
      description: "Complete hardware solutions including CCTV and networking equipment",
      icon: "desktop"
    }
  ];

  const services = [
    {
      id: 1,
      name: "Teleconferencing",
      description: "Being one of our major service and installation package, teleconferencing is one of the world's most advanced technology in this age. Its most basic advantage is its potential to reduce the cost of group meetings. Savings come primarily from reduced travel costs.",
      features: [
        "Attend a business meeting hundreds of miles away without leaving your office",
        "Reduce travel expenses",
        "Reduce travel time requirements",
        "Schedule meetings minutes ahead of time instead of days or weeks",
        "Keep in touch with other branches of your business",
        "We install and maintain these beautiful pieces of hardware for as long as you subscribe."
      ],
      imageUrl: "Services_Images/Teleconferencing.jpg" // Add your image path here
    },
    {
      id: 2,
      name: "ICT Training for Human Resource Development in Private and Public Parastatals",
      description: (
        <>
          Computers have simplified the task of analyzing vast amounts of data, and they can be invaluable aids in HR management, from payroll processing to record retention. With computer hardware, software, and databases, organizations can keep records and information better, as well as retrieve them with greater ease. Information Technology (IT) as a structural factor and instrument transforms architects of organizations, business processes and communication and is increasingly integrated into Human Resource Management. While IT is having impact on HR, the managers, employees, customers and suppliers increase their expectancies for HR functions.
          <br /><br />
          These are the challenges IT will place on HR:
        </>
      ),
      features: [
        "On-site training programs",
        "HR technology integration",
        "Business process automation",
        "Strategic IT implementation",
        "Customized learning solutions"
      ],
      imageUrl: "Services_Images/ICT Training.jpg" // Add your image path here
    },
    {
      id: 3,
      name: "VSAT Installation",
      description: (
        <>
          The Very Small Aperture Terminal is a one-way or two-way satellite ground station consisting of a dish antenna smaller than three meters across. The VSAT's function is to access the signal from a specific orbiting satellite, at which the antenna is pointed, and relay data back and forth from other terminals and hubs. VSAT systems are attractive where the coverage area is large, where quick installation is required and where terrestrial alternatives are difficult to organize.
          <br /><br />
          Because of the convenient size, VSAT technology has made satellite communication an attractive and viable option for a wide range of industrial applications, including mobile communications and broadband VSAT. It works in conjunction with the iDirect Modem.
          <br /><br />
          The various benefits of using VSAT are:
        </>
      ),
      features: [
        "Availability - easily deployed anywhere in the world",
        "Independence - completely wireless, independent of local infrastructure",
        "Backup for potential disasters",
        "Easy setup - can be setup in less time",
        "Strength and speed of the VSAT connection",
        "Security – private layer 2 networks over the air",
        "Pricing – very affordable",
        "Cost-effectiveness – serves the same content to thousands of locations at once for no additional cost",
        "Onboard acceleration of protocols – Allows the delivery of high quality connections regardless of latency"
      ],
      additionalInfo: (
        <>
          <h4 className="font-bold mt-4 mb-2">The Uses of VSAT are vast:</h4>
          <ul className="list-disc pl-5 mb-4">
            <li>Point of Sale systems like shopping malls and eateries</li>
            <li>Internet access for WiFi at cafés and offices</li>
            <li>Teleconferencing</li>
            <li>Broadcasting for TV station vans</li>
            <li>Financial feeds from stock markets</li>
            <li>Paging messages</li>
          </ul>
          <p className="mt-4">
            If you were worried about the long term maintenance, we handle your maintenance and do regular check-ups for as long as you want to subscribe with us. We handle the cost of materials and their transportation into the country, labor cost for the installation and the maintenance, COT and VAT inclusive.
          </p>
        </>
      ),
      imageUrl: "/vsat.jpg"
    },
    {
      id: 4,
      name: "IT Hardware Solutions",
      description: (
        <>
          Comprehensive hardware solutions including CCTVs, touchscreen laptops, video cameras, routers, and printers with professional installation services.
          <br /><br />
          We've made it easier for you to get your computer related products and not worry about their originality.
        </>
      ),
      features: [
        "CCTV system installation",
        "PC and tablet setup",
        "Router configuration",
        "Printer installation",
        "Ongoing maintenance support"
      ],
      additionalInfo: (
        <div className="mt-4">
          <p className="mb-4">Take a look at our products.</p>
          <Link 
            to="/products" 
            className="inline-block w-full md:w-auto min-w-[200px] px-8 py-4 text-lg font-semibold bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
          >
            View Products
          </Link>
        </div>
      ),
      imageUrl: "/hardware.jpg"
    }
  ];

  // const caseStudies = [
  //   {
  //     id: 1,
  //     title: "E-commerce Platform Transformation",
  //     description: "Helping a retail business transform their online presence",
  //     challenge: "An established retail business needed to modernize their outdated e-commerce platform to meet growing online demand and improve customer experience.",
  //     solution: "Implemented a modern, scalable e-commerce solution with advanced features and mobile-first design.",
  //     results: "200% increase in online sales, 50% reduction in cart abandonment, and significantly improved customer satisfaction scores.",
  //     clientName: "Global Retail Co.",
  //     industry: "Retail",
  //     imageUrl: "/placeholder.svg"
  //   },
  //   {
  //     id: 2,
  //     title: "Cloud Migration Success",
  //     description: "Seamless migration of legacy systems to the cloud",
  //     challenge: "A financial services company needed to migrate their legacy infrastructure to the cloud while ensuring zero downtime and maintaining security compliance.",
  //     solution: "Developed a phased migration strategy and implemented automated deployment pipelines with robust security measures.",
  //     results: "40% reduction in infrastructure costs, improved system reliability, and enhanced security posture.",
  //     clientName: "Financial Services Inc.",
  //     industry: "Financial Services",
  //     imageUrl: "/placeholder.svg"
  //   }
  // ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering businesses with cutting-edge technology solutions and expert services
          </p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <ServiceCategory
                key={category.id}
                name={category.name}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceDetail
                key={service.id}
                name={service.name}
                description={service.description}
                features={service.features}
                additionalInfo={service.additionalInfo}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Case Studies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <CaseStudy
                key={study.id}
                title={study.title}
                description={study.description}
                challenge={study.challenge}
                solution={study.solution}
                results={study.results}
                clientName={study.clientName}
                industry={study.industry}
                imageUrl={study.imageUrl}
              />
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Services;
