
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, Award } from 'lucide-react';
import RegistrationForm from '@/components/training/RegistrationForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Training = () => {
  const [showForm, setShowForm] = useState(false);
  
  const courses = [
    {
      title: "Network Administration",
      duration: "12 weeks",
      participants: "10-15 students",
      certification: "CompTIA Network+ Certification",
      description: "Master network administration and security fundamentals."
    },
    {
      title: "Software Development",
      duration: "16 weeks",
      participants: "12-15 students",
      certification: "Full Stack Developer Certificate",
      description: "Learn modern web development with latest technologies."
    },
    {
      title: "Cloud Computing",
      duration: "8 weeks",
      participants: "8-12 students",
      certification: "AWS Associate Certificate",
      description: "Understand cloud infrastructure and DevOps practices."
    },
    {
      title: "Data Science & Analytics",
      duration: "10 weeks",
      participants: "8-12 students",
      certification: "Data Analyst Certificate",
      description: "Learn to analyze and visualize data to drive business decisions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      <section className="relative pt-32 pb-16 px-6">
        {/* Hero background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519389950473-47ba0277781c)' }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">Professional Training Programs</h1>
          <p className="text-xl text-blue-700 max-w-3xl">
            Advance your career with our industry-focused training programs. Learn from experienced professionals and gain practical skills.
          </p>
          <Button 
            size="lg" 
            className="mt-8 bg-blue-700 hover:bg-blue-800"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'View Available Courses' : 'Register for a Course'}
          </Button>
        </div>
      </section>

      {showForm ? (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <RegistrationForm />
          </div>
        </section>
      ) : (
        <>
          {/* Course Listings */}
          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Available Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {courses.map((course, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-500">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{course.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{course.participants}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="w-4 h-4 text-blue-600" />
                          <span>{course.certification}</span>
                        </div>
                      </div>
                      <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                        onClick={() => setShowForm(true)}
                      >
                        Register Now
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Training Benefits */}
          <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Why Choose Our Training?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                  <p className="text-muted-foreground">Learn from industry professionals with years of experience</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Users className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Small Class Sizes</h3>
                  <p className="text-muted-foreground">Personalized attention and interactive learning environment</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Clock className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                  <p className="text-muted-foreground">Choose from various time slots that suit your schedule</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
                  <Award className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Certification</h3>
                  <p className="text-muted-foreground">Receive industry-recognized certificates upon completion</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Training;
