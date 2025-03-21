
import { useState } from 'react';

interface TeamMemberProps {
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
  qualifications: string[];
}

const TeamMember = ({ name, position, bio, imageUrl, qualifications }: TeamMemberProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-all duration-300">
      <div className="aspect-square relative overflow-hidden bg-accent/10">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-accent">
            {initials}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-accent mt-1">{position}</p>
        
        <div className="mt-4 space-y-2">
          <div className={`text-muted-foreground ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {bio}
          </div>
          
          {bio.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-accent hover:underline"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {qualifications.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {qualifications.map((qual, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent"
              >
                {qual}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;
