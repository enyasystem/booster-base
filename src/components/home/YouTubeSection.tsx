import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const videos = [
  {
    id: "RWgW-CgdIk0",
    title: "Understanding Cloud Computing",
    description: "A comprehensive guide to cloud computing concepts and services",
    thumbnail: `https://img.youtube.com/vi/RWgW-CgdIk0/maxresdefault.jpg`
  },
  {
    id: "ULGILG-ZhO0",
    title: "Cybersecurity Essentials",
    description: "Learn the fundamentals of cybersecurity and best practices",
    thumbnail: `https://img.youtube.com/vi/ULGILG-ZhO0/maxresdefault.jpg`
  },
  {
    id: "tSodBEAJz9Y",
    title: "Networking Explained",
    description: "Introduction to computer networking concepts and principles",
    thumbnail: `https://img.youtube.com/vi/tSodBEAJz9Y/maxresdefault.jpg`
  },
  {
    id: "B-ytMSuwbf8",
    title: "Web Design for Beginners",
    description: "Learn essential web design principles and best practices for creating modern websites",
    thumbnail: `https://img.youtube.com/vi/B-ytMSuwbf8/maxresdefault.jpg`
  },
  {
    id: "O0k63-FWqfw",
    title: "How to Connect two Computers in a LAN",
    description: "Learn how to connect two computers in a Local Area Network using Cat5 cable",
    thumbnail: `https://img.youtube.com/vi/O0k63-FWqfw/maxresdefault.jpg`
  },
  {
    id: "12gPJktJEU4",
    title: "Simple Local Area Network Setup",
    description: "Step-by-step guide to setting up a basic Local Area Network",
    thumbnail: `https://img.youtube.com/vi/12gPJktJEU4/maxresdefault.jpg`
  },
  {
    id: "vpNhwl3XihI",
    title: "Adding LAN Ports To Your Router",
    description: "Learn how to increase your LAN ports and improve network speed",
    thumbnail: `https://img.youtube.com/vi/vpNhwl3XihI/maxresdefault.jpg`
  }
];

const YouTubePlayIcon = () => (
  <svg 
    className="w-16 h-16" 
    viewBox="0 0 68 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="fill-[#ff0000]"
      d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
    />
    <path 
      className="fill-white" 
      d="M 45,24 27,14 27,34"
    />
  </svg>
);

const YouTubeSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Educational Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of educational videos on cloud computing, cybersecurity, and networking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video Preview */}
              <div className="relative aspect-video group">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <YouTubePlayIcon />
                </div>
                <div 
                  className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300 flex items-center justify-center"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 
                      hover:bg-red-700 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveVideo(video.id);
                    }}
                  >
                    Play Video <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{video.title}</h3>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <div className="relative w-full max-w-4xl aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                className="absolute inset-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default YouTubeSection;
