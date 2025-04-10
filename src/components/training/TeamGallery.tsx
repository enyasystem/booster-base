import { useState } from "react";

interface TeamPhoto {
  id: string;
  url: string;
  caption: string;
  description?: string;
}

interface TeamGalleryProps {
  photos: TeamPhoto[];
}

const TeamGallery = ({ photos }: TeamGalleryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex + photos.length - 1) % photos.length);
  };

  return (
    <>
      {/* Group Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <div key={photo.id} className="space-y-6">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-80 object-contain rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleOpen(index)}
            />
            <p className="text-center text-gray-600">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={handleClose}
          >
            &times;
          </button>
          <div className="relative max-w-4xl w-full">
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-lg font-semibold">{photos[currentIndex].caption}</h3>
              {photos[currentIndex].description && (
                <p className="text-sm">{photos[currentIndex].description}</p>
              )}
            </div>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={handlePrev}
            >
              &#8249;
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl"
              onClick={handleNext}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamGallery;
