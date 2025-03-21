import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

const TrainingSection = () => {
  const navigate = useNavigate();

  const courses = [
    {
      title: "Network Administration",
      duration: "12 weeks",
      certification: "CompTIA Network+ Certification",
      description: "Comprehensive network administration and security training."
    },
    {
      title: "Software Development",
      duration: "16 weeks",
      certification: "Full Stack Developer Certificate",
      description: "Modern web development with latest technologies."
    },
    {
      title: "Cloud Computing",
      duration: "8 weeks",
      certification: "AWS Associate Certificate",
      description: "Cloud infrastructure and DevOps practices."
    }
  ];

  const handleNavigateToTraining = () => {
    navigate('/training');
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Training & Learning Institute</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-grow">
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="space-y-2 mb-4">
                  <p><strong>Duration:</strong> {course.duration}</p>
                  <p><strong>Certification:</strong> {course.certification}</p>
                </div>
                <div className="mt-auto">
                  <Button 
                    className="w-full"
                    onClick={handleNavigateToTraining}
                  >
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
