import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, Award } from 'lucide-react';
import RegistrationForm from '@/components/training/RegistrationForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import TrainingGallery from '@/components/training/TrainingGallery';
import TeamGallery from '@/components/training/TeamGallery';

const teamData = {
  photos: [
    {
      id: '1',
      url: '/images/training/Booster Base Trainee with instructors1.jpg',
      caption: 'Python Programming Batch 2024',
      description: 'Celebrating the achievements of our Python programming graduates with instructors.'
    },
    {
      id: '2',
      url: '/images/training/Booster Base Trainee with instructors.jpg',
      caption: 'Computer Application Batch 2024',
      description: 'Interactive workshop featuring hands-on training with industry professionals.'
    },
    {
      id: '3',
      url: '/Training Lab.jpg',
      caption: 'Training Lab (Featuring whiteboard and projector tools)',
      description: 'A glimpse of our state-of-the-art training lab equipped with modern teaching tools.'
    },
    {
      id: '4',
      url: '/Training Lab1.jpg',
      caption: 'Training Lab (Desktops and seating arrangement)',
      description: 'An overview of our well-organized training lab designed for collaborative learning.'
    },
    {
      id: '5',
      url: 'https://th.bing.com/th/id/OIP.Y6JvzQUuqy4vaSnOjwxm4gHaEb?rs=1&pid=ImgDetMain', // Drone-related Unsplash image
      caption: 'Drone Flying Workshop',
      description: 'Hands-on training session on drone flying and aerial photography.'
    }
  ]
};

const Training = () => {
  const [showForm, setShowForm] = useState(false);
  
  const courses = [
    {
      title: "Computer Application",
      duration: "10 weeks",
      participants: "10-15 students",
      certification: "Microsoft Office Specialist Certification",
      description: "Comprehensive training in computer applications and productivity tools."
    },
    {
      title: "Web Design and Programming",
      duration: "14 weeks",
      participants: "12-15 students",
      certification: "Certified Web Designer",
      description: "Learn modern web design principles and programming techniques."
    },
    {
      title: "Python",
      duration: "6 weeks",
      participants: "8-12 students",
      certification: "Python Programming Certificate",
      description: "Master Python programming for data analysis and automation."
    },
    {
      title: "Drone Flying",
      duration: "4 weeks",
      participants: "5-10 students",
      certification: "Certified Drone Pilot",
      description: "Learn the fundamentals of drone operation, safety, and aerial photography."
    }
  ];

  const trainingImages = [
    {
      id: '1',
      url: '/images/training/image1.jpg',
      caption: 'Advanced React Workshop - Spring 2025',
      date: 'April 15, 2025',
    },
    {
      id: '2',
      url: '/images/training/image2.jpg',
      caption: 'Introduction to Cloud Computing - Summer 2025',
      date: 'June 10, 2025',
    },
    {
      id: '3',
      url: '/images/training/image3.jpg',
      caption: 'Data Science Bootcamp - Fall 2025',
      date: 'September 20, 2025',
    },
    {
      id: '4',
      url: '/images/training/image4.jpg',
      caption: 'Cybersecurity Essentials - Winter 2025',
      date: 'January 15, 2026',
    },
  
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900 text-center">Professional Training Programs</h1>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto text-center">
            Advance your career with our industry-focused training programs. Learn from experienced professionals and gain practical skills.
          </p>
          <div className="flex justify-center mt-8">
            <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg rounded-lg shadow-lg transition-all duration-300" onClick={() => setShowForm(true)} disabled>
              Register Now
            </Button>
          </div>
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
                  <Card key={index} className="flex flex-col h-full min-h-[420px]">
                    <div className="flex-0">
                      <CardHeader className="pb-2">
                        <CardTitle>{course.title}</CardTitle>
                      </CardHeader>
                    </div>
                    <CardContent className="flex flex-col flex-1">
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <div className="space-y-2 mb-4">
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
                      <div className="mt-auto flex items-end">
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full" onClick={() => setShowForm(true)} disabled>
                          Register Now
                        </Button>
                      </div>
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

          {/* Team & Leadership Showcase */}
          <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">Our Training Community</h2>
              <TeamGallery photos={teamData.photos} />
            </div>
          </section>

          {/* Training Gallery */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Training Moments</h2>
              <TrainingGallery images={trainingImages} />
            </div>
          </section>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Training;
