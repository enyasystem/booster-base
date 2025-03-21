
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CaseStudyProps {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  clientName?: string;
  industry?: string;
  imageUrl?: string;
}

const CaseStudy = ({
  title,
  description,
  challenge,
  solution,
  results,
  clientName,
  industry,
  imageUrl
}: CaseStudyProps) => {
  return (
    <Card className="overflow-hidden">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {(clientName || industry) && (
          <div className="text-sm text-muted-foreground">
            {clientName && <span>Client: {clientName}</span>}
            {clientName && industry && <span className="mx-2">•</span>}
            {industry && <span>Industry: {industry}</span>}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        
        <div>
          <h4 className="font-semibold mb-2">The Challenge</h4>
          <p>{challenge}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Our Solution</h4>
          <p>{solution}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">Results</h4>
          <p>{results}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudy;
