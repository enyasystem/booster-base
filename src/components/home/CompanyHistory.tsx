
import Timeline from "@/components/ui/timeline";

const CompanyHistory = () => {
  const milestones = [
    {
      year: 2003,
      title: "Company Founded",
      description: "Started operations as a technology solutions provider"
    },
    {
      year: 2009,
      title: "Official Registration",
      description: "Registered as a formal business entity"
    },
    {
      year: 2010,
      title: "Full Operations",
      description: "Expanded services and began full-scale operations"
    },
    {
      year: 2015,
      title: "Training Institute Launch",
      description: "Launched our ICT & Engineering Training Institute"
    },
    {
      year: 2020,
      title: "Digital Transformation",
      description: "Expanded into comprehensive digital transformation services"
    }
  ];

  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <Timeline items={milestones} />
      </div>
    </section>
  );
};

export default CompanyHistory;
