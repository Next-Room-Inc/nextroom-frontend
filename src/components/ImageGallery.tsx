import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Main view"
          className="w-full h-72 object-cover rounded-2xl transition-opacity duration-500 ease-in-out opacity-100" // Add transition for opacity
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <ChevronRightIcon className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center mt-4 gap-2 flex-wrap ">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 rounded-xl cursor-pointer object-cover border-2 transition-all duration-300 ease-in-out transform ${
              currentIndex === index
                ? "border-blue-500 scale-110"
                : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
