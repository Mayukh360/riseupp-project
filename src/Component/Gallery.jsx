import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import icon from '../asset/icon.png'

const ACCESS_KEY = "iEKEPOqCiKe3USRs6LUqasUdI_H8iOiOU-ZuAm52G4I";
const API_URL = "https://api.unsplash.com/search/photos";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          query: submitted,
          orientation: "landscape",
        },
      });

      setImages(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(query);
    setQuery("");
  };
  const onMuntainClick = () => {
    setSubmitted("mountain");
  };
  const onFlowerClick = () => {
    setSubmitted("flower");
  };
  const onBeachesClick = () => {
    setSubmitted("beaches");
  };
  const onCitiesClick = () => {
    setSubmitted("cities");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
        <img src={icon} className="h-20 w-20  mt-2 mb-2"/>
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="flex items-center">
        
          <input
            type="text"
            value={query}
            onChange={handleSearchInputChange}
            className="border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none"
            placeholder="Enter your search query"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
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
      <div>
      {submitted && !isLoading && (
          <div className="absolute left-20 top-40">
            <span className="text-left text-2xl font-bold mb-4 ml-4 text-orange-600 bg-green-100 px-8 py-2 border-2  border-black">
              Heading: {submitted}
            </span>
          </div>
        )}

       {isLoading && (
          <div className="absolute left-20 top-36">
            <p className="text-left mb-4 ml-4">Loading....</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {images &&
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
              className="m-2 rounded w-80 h-60 object-cover"
            />
          ))}
      </div>
    </div>
  );
}
