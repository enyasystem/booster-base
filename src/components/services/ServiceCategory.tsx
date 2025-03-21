
import { Briefcase, Cog, Server, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCategoryProps {
  name: string;
  description: string;
  icon: string;
}

const ServiceCategory = ({ name, description, icon }: ServiceCategoryProps) => {
  const IconComponent = () => {
    switch (icon) {
      case 'server':
        return <Server className="h-6 w-6 text-primary" />;
      case 'cog':
        return <Cog className="h-6 w-6 text-primary" />;
      case 'briefcase':
        return <Briefcase className="h-6 w-6 text-primary" />;
      case 'graduation-cap':
        return <GraduationCap className="h-6 w-6 text-primary" />;
      default:
        return <Briefcase className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconComponent />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ServiceCategory;
