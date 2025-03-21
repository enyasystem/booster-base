
import { Card, CardContent } from "@/components/ui/card";

const LeadershipTeam = () => {
  const leaders = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Executive Officer",
      qualifications: ["Ph.D. in Computer Science", "MBA", "BSc in Engineering"],
      imageUrl: "/placeholder.svg",
      bio: "Over 20 years of experience in technology leadership and business transformation."
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      qualifications: ["MSc in Software Engineering", "AWS Solutions Architect"],
      imageUrl: "/placeholder.svg",
      bio: "Expert in cloud architecture and digital transformation strategies."
    },
    {
      name: "Prof. David Williams",
      role: "Director of Training Institute",
      qualifications: ["Ph.D. in Education", "MEng in Electrical Engineering"],
      imageUrl: "/placeholder.svg",
      bio: "Leading academic professional with extensive industry experience."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {leaders.map((leader) => (
        <Card key={leader.name}>
          <div className="aspect-square relative">
            <img
              src={leader.imageUrl}
              alt={leader.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">{leader.name}</h3>
            <p className="text-primary mb-2">{leader.role}</p>
            <p className="text-muted-foreground text-sm mb-4">{leader.bio}</p>
            <div className="flex flex-wrap gap-2">
              {leader.qualifications.map((qual, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-muted rounded-full"
                >
                  {qual}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeadershipTeam;
