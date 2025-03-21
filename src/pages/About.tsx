
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ValueCard from '@/components/about/ValueCard';
import TeamMember from '@/components/about/TeamMember';
import Timeline from '@/components/about/Timeline';
import { Award, Users, Shield, Heart } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Database } from '@/integrations/supabase/types';

// Use types from the Database type
type TeamMemberRow = Database['public']['Tables']['team_members']['Row'];
type MilestoneRow = Database['public']['Tables']['milestones']['Row'];

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

  const { data: milestones } = useQuery<MilestoneRow[]>({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .order('year');
      
      if (error) throw error;
      return data;
    }
  });

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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the way in ICT and Engineering solutions since 2003, empowering 
            businesses across Nigeria with cutting-edge technology and expertise.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          {milestones && (
            <Timeline 
              items={milestones.map(m => ({
                year: m.year,
                title: m.title,
                description: m.description ?? ''
              }))} 
            />
          )}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers?.map((member) => (
              <TeamMember
                key={member.id}
                name={member.full_name}
                position={member.position}
                bio={member.bio ?? ''}
                imageUrl={member.image_url ?? undefined}
                qualifications={member.qualifications}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
