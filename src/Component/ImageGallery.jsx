import React from "react";
import ImageCard from "./ImageCard";
import { AiOutlineLoading } from "react-icons/ai";

export default function ImageGallery({ images, isLoading, submitted }) {
  return (
    <div>
      {submitted && !isLoading && (
        <div className="mb-2 flex justify-start items-start">
          <span className="text-left text-2xl font-bold ml-4 text-orange-800 bg-green-100 px-8 py-2 border-2 border-black">
            {submitted}
          </span>
        </div>
      )}

      {isLoading && <AiOutlineLoading className="inline-block animate-spin w-8 h-8 mr-2" />}

      <div className="flex flex-wrap justify-center items-center">
        {images &&
          images.map((image) => <ImageCard key={image.id} image={image} />)}
      </div>
    </div>
  );
}
