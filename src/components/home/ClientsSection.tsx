import { useEffect, useState } from 'react';
// import { supabase } from "@/integrations/supabase/client";
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Client {
  id: string;
  name: string;
  logo_url: string;
  industry?: string;
}

// Replace the logo_url with the new picture you provide
const defaultClients = [
  { 
    id: '1', name: 'ITF', logo_url: '/ITF_logo_6.jpeg' },
    {id: '2', name: 'SUPA', logo_url: '/SUPA_Logo.png' },
  // { id: '2', name: 'IBM', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png' },
  // { id: '3', name: 'Oracle', logo_url: 'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Symbol.png' },
  // { id: '4', name: 'Cisco', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png' },
  // { id: '5', name: 'Dell', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png' },
  // { id: '6', name: 'HP', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/2048px-HP_logo_2012.svg.png' },
  // { id: '7', name: 'Intel', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1005px-Intel_logo_%282006-2020%29.svg.png' },
  // { id: '8', name: 'Lenovo', logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/2560px-Lenovo_logo_2015.svg.png' }
];

const ClientsSection = () => {
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 2 }, [
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await (supabase as any)
          .from('clients')
          .select('*');

        if (error) throw error;
        
        if (data && data.length > 0) {
          setClients(data as Client[]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-2 text-blue-900">Our Trusted Clients</h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          We're proud to have worked with leading organizations across various industries
        </p>
        
        <Carousel
          ref={emblaRef}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {clients.map((client) => (
              <CarouselItem key={client.id} className="md:basis-1/3 lg:basis-1/5 pl-4">
                <div className="flex items-center justify-center h-24 p-4 bg-white rounded-lg shadow-sm transition-transform hover:scale-105">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ClientsSection;
