import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceDetailProps {
  name: string;
  description: React.ReactNode;
  features: string[];
  additionalInfo?: React.ReactNode;
  imageUrl: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ 
  name, 
  description, 
  features, 
  additionalInfo, 
  imageUrl 
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="description">
          {description}
        </div>
        {features && features.length > 0 && (
          <ul className="list-disc list-inside space-y-2">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        {additionalInfo && <div className="additional-info">{additionalInfo}</div>}
      </CardContent>
    </Card>
  );
};

export default ServiceDetail;
