
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceDetailProps {
  name: string;
  description: string;
  features: string[];
  imageUrl?: string;
}

const ServiceDetail = ({ name, description, features, imageUrl }: ServiceDetailProps) => {
  return (
    <Card className="overflow-hidden">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {features && features.length > 0 && (
          <ul className="list-disc list-inside space-y-2">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceDetail;
