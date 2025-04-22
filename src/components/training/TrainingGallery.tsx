import { useState } from "react";
import CustomLightbox from "@/components/ui/CustomLightbox";

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

const TrainingGallery = ({ images }: { images: GalleryImage[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Coming Soon</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleOpen(index)}
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm">{image.caption}</p>
                <p className="text-xs">{image.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Lightbox */}
      <CustomLightbox
        isOpen={isOpen}
        images={images.map((image) => ({
          url: image.url,
          caption: image.caption,
          description: image.date,
        }))}
        currentIndex={currentIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default TrainingGallery;
