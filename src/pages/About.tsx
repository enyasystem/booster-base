import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ValueCard from '@/components/about/ValueCard';
import TeamMember from '@/components/about/TeamMember';
import { Award, Users, Shield, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Database } from '@/integrations/supabase/types';

type TeamMemberRow = Database['public']['Tables']['team_members']['Row'];

const About = () => {
  const { data: teamMembers } = useQuery<TeamMemberRow[]>({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index');
      
      if (error) throw error;
      return data;
    }
  });

  const directors = [
    {
      id: 1,
      full_name: 'Engr. Bebeyi Lanre H.',
      position: 'Chairman/Chief Executive Officer',
      qualifications: [
        'B. Tech, Dip (Computer Engineering)',
        'PGD (Electronics/Electrical Technology with Physics)',
        'MSc. Information Technology(In-view)'
      ]
    },
    {
      id: 3,
      full_name: 'Princess Josephine O. Bebeyi',
      position: 'Director, Training and Learning Institute',
      qualifications: [
        'B.Ed (University of Jos)'
      ]
    },
    {
      id: 4,
      full_name: 'Grace Abiodun',
      position: 'Chief Technical Officer',
      qualifications: [
        'CCNA (CISCO Certified Network Associate)',
        'CCNP (CISCO Certified Network Professional)'
      ]
    }
  ];

  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Professionalism',
      description: 'We maintain the highest standards of professionalism in all our operations.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Commitment',
      description: "Dedicated to delivering excellence and meeting our clients' needs."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and ethical practices.'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Customer Satisfaction',
      description: 'Your success and satisfaction are at the heart of everything we do.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Booster Base</h1>
          <div className="text-xl text-muted-foreground max-w-4xl mx-auto space-y-6">
            <p>
              Booster Base Nigeria Limited was registered with Corporate Affairs Commission of Nigeria in 2009.
              The Company established her headquarters in Jos, Plateau State, Nigeria in the same year and started 
              operation in 2010. The company has been running as Bbase International, an enterprise since 2003.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                To be among the best quality service providers in Information and Communication Technology, 
                Engineering services and Supply of ICT equipments within Nigeria and Africa.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                To provide cutting-edge services/products in ICT and Engineering using the best available 
                technologies and techniques to meet the needs of our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Board of Directors</h2>
          <p className="text-center text-muted-foreground mb-8">
            The board of directors of the Company include reputable Nigerian ICT and Engineering Professionals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {directors.map((director) => (
              <div key={director.id} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-2">{director.position}</h3>
                <h4 className="text-lg font-semibold text-primary mb-3">{director.full_name}</h4>
                <div className="space-y-1">
                  {director.qualifications.map((qual, index) => (
                    <p key={index} className="text-muted-foreground text-sm">
                      • {qual}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At Booster Base, we're passionate about developing programs, training people and 
            offering products that make every new day simpler, and it's all thanks to the 
            support and feedback from clients like you! Keep up to date with New Releases 
            and what's Coming Soon...
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
