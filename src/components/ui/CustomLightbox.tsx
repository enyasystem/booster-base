import { useEffect } from "react";
import { X } from "lucide-react";

interface CustomLightboxProps {
  isOpen: boolean;
  images: { url: string; caption: string; description?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const CustomLightbox = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: CustomLightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const { url, caption, description } = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <button
        className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
      <div className="relative max-w-4xl w-full h-auto p-4">
        <img
          src={url}
          alt={caption}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
        <div className="mt-4 text-center text-white">
          <h3 className="text-lg font-semibold">{caption}</h3>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200"
        onClick={onPrev}
        aria-label="Previous"
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-200"
        onClick={onNext}
        aria-label="Next"
      >
        &#8594;
      </button>
    </div>
  );
};

export default CustomLightbox;
