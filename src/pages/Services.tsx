
import Navigation from '@/components/Navigation';
import ServiceCategory from '@/components/services/ServiceCategory';
import ServiceDetail from '@/components/services/ServiceDetail';
import CaseStudy from '@/components/services/CaseStudy';

const Services = () => {
  const categories = [
    {
      id: 1,
      name: "Software Development",
      description: "Custom software solutions tailored to your business needs",
      icon: "cog"
    },
    {
      id: 2,
      name: "Cloud Services",
      description: "Scalable cloud infrastructure and migration services",
      icon: "server"
    },
    {
      id: 3,
      name: "Business Consulting",
      description: "Strategic technology consulting for business growth",
      icon: "briefcase"
    },
    {
      id: 4,
      name: "Training & Development",
      description: "Professional development and technical training programs",
      icon: "graduation-cap"
    }
  ];

  const services = [
    {
      id: 1,
      name: "Web Application Development",
      description: "Create powerful, scalable web applications using modern technologies",
      features: [
        "Custom web application development",
        "Progressive Web Apps (PWA)",
        "API development and integration",
        "UI/UX design and implementation"
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Cloud Infrastructure",
      description: "Build and manage scalable cloud infrastructure solutions",
      features: [
        "Cloud migration services",
        "Infrastructure automation",
        "DevOps implementation",
        "24/7 monitoring and support"
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Digital Transformation",
      description: "Transform your business with modern digital solutions",
      features: [
        "Business process automation",
        "Legacy system modernization",
        "Digital strategy consulting",
        "Technology roadmap planning"
      ],
      imageUrl: "/placeholder.svg"
    },
    {
      id: 4,
      name: "IT Consulting",
      description: "Expert guidance for your technology initiatives",
      features: [
        "Technology assessment",
        "IT strategy development",
        "Project management",
        "Security consulting"
      ],
      imageUrl: "/placeholder.svg"
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Platform Transformation",
      description: "Helping a retail business transform their online presence",
      challenge: "An established retail business needed to modernize their outdated e-commerce platform to meet growing online demand and improve customer experience.",
      solution: "Implemented a modern, scalable e-commerce solution with advanced features and mobile-first design.",
      results: "200% increase in online sales, 50% reduction in cart abandonment, and significantly improved customer satisfaction scores.",
      clientName: "Global Retail Co.",
      industry: "Retail",
      imageUrl: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Cloud Migration Success",
      description: "Seamless migration of legacy systems to the cloud",
      challenge: "A financial services company needed to migrate their legacy infrastructure to the cloud while ensuring zero downtime and maintaining security compliance.",
      solution: "Developed a phased migration strategy and implemented automated deployment pipelines with robust security measures.",
      results: "40% reduction in infrastructure costs, improved system reliability, and enhanced security posture.",
      clientName: "Financial Services Inc.",
      industry: "Financial Services",
      imageUrl: "/placeholder.svg"
    }
  ];

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
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
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
      </section>
    </div>
  );
};

export default Services;
