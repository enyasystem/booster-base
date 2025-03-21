
interface TimelineItem {
  year: number;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/20 md:left-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <div key={index} className={`relative flex items-center ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}>
            {/* Content */}
            <div className="ml-12 md:w-1/2 md:ml-0 md:px-8">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <span className="text-accent font-semibold">{item.year}</span>
                <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            </div>

            {/* Circle */}
            <div className="absolute left-4 w-4 h-4 bg-accent rounded-full md:left-1/2 md:-ml-2">
              <div className="absolute w-8 h-8 bg-accent/20 rounded-full -left-2 -top-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
