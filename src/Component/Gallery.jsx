import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import icon from "../asset/icon.png";
import { AiOutlineSearch, AiOutlineLoading } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

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
      console.log(response.data.results.urls);
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
    <div className="min-h-screen flex flex-col  items-center bg-gray-200">
      <img src={icon} className="h-20 w-20  mt-2 mb-2" />
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
            <AiOutlineSearch className="inline-block mr-2 ml-2" />
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
          <div className="mb-2 flex justify-start items-start">
            <span className="text-left text-2xl font-bold  ml-4 text-orange-800 bg-green-100 px-8 py-2 border-2  border-black">
              {submitted}
            </span>
          </div>
        )}

        {isLoading && (
          <AiOutlineLoading className="inline-block animate-spin w-8 h-8 mr-2" />
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {images &&
          images.map((image) => (
            <div key={image.id} className="m-4">
              {/* Wrap the image with ReactTooltip */}
              <Tooltip
                title={
                  <a
                    href={image.urls.full}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {image.alt_description}
                  </a>
                }
                placement="top"
              >
                {/* Add data-tip and data-for attributes to the image */}
                <img
                  src={image.urls.small}
                  alt={image.alt_description}
                  className="w-80 h-60 object-cover"
                  data-tip
                  data-for={`tooltip-${image.id}`}
                />
              </Tooltip>
            </div>
          ))}
      </div>
    </div>
  );
}
