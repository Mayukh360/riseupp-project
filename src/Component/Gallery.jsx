import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import icon from "../asset/icon.png";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";

const ACCESS_KEY = "iEKEPOqCiKe3USRs6LUqasUdI_H8iOiOU-ZuAm52G4I";
const API_URL = "https://api.unsplash.com/search/photos";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          query,
          orientation: "landscape",
        },
      });

      setImages(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      fetchData(submitted);
    }
  }, [submitted]);

  const handleSubmit = (query) => {
    setSubmitted(query);
  };

  const onMuntainClick = () => {
    setSubmitted("Mountain");
  };

  const onFlowerClick = () => {
    setSubmitted("Flower");
  };

  const onBeachesClick = () => {
    setSubmitted("Beaches");
  };

  const onCitiesClick = () => {
    setSubmitted("Cities");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200">
      <img src={icon} className="h-20 w-20 mt-2 mb-2" />
      <SearchBar onSubmit={handleSubmit} />
      <div className="mb-4">
        <button
          onClick={onMuntainClick}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Mountain
        </button>
        <button
          onClick={onFlowerClick}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Flowers
        </button>
        <button
          onClick={onBeachesClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Beaches
        </button>
        <button
          onClick={onCitiesClick}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          Cities
        </button>
      </div>
      <ImageGallery images={images} isLoading={isLoading} submitted={submitted} />
    </div>
  );
}
