
import { Award, Users, Shield, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CoreValues = () => {
  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Professionalism",
      description: "We maintain the highest standards of professionalism in all our operations."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Commitment",
      description: "Dedicated to delivering excellence and meeting our clients' needs."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "We conduct our business with honesty, transparency, and ethical practices."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Satisfaction",
      description: "Your success and satisfaction are at the heart of everything we do."
    }
  ];

  return (
    <section className="py-16 px-6 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  {value.icon}
                </div>
                <CardTitle className="mt-4">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
