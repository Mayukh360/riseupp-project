import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import icon from "../asset/icon.jpeg";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";

const ACCESS_KEY = "iEKEPOqCiKe3USRs6LUqasUdI_H8iOiOU-ZuAm52G4I";
const API_URL = "https://api.unsplash.com/search/photos";

const PER_PAGE = 12;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (query, page) => {
    setLoading(true); // Setting loading state
    try {
      const response = await axios.get(API_URL, { // Fetching data from Unsplash Api
        headers: {
          Authorization: `Client-ID ${ACCESS_KEY}`,
        },
        params: {
          query,
          orientation: "landscape",
          page,
          per_page: PER_PAGE,
        },
      });

      setImages(response.data.results); //State updating functions for image rendering
      setTotalPages(response.data.total_pages); //State updating function for total page
      setLoading(false); // Loading icon will stop here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (submitted) {
      fetchData(submitted, currentPage); //UseEffect will only run after data is submitted
    }
  }, [submitted, currentPage]);

  const handleSubmit = (query) => {
    setSubmitted(query);
    setCurrentPage(1); // Reset to the first page when submitting a new query
  };

  const handleButtonClick = (direction) => { //Handling the page direction by increasing and decreasing current page
    if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCategoryClick = (category) => {
    setSubmitted(category);
    setCurrentPage(1); // Reset to the first page when clicking a category button
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200">
      <img src={icon} className="h-20 w-20 mt-2 mb-2" />
      <SearchBar onSubmit={handleSubmit} />
      <div className="mb-4">
        <button
          onClick={() => handleCategoryClick("Mountain")}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Mountain
        </button>
        <button
          onClick={() => handleCategoryClick("Flower")}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Flowers
        </button>
        <button
          onClick={() => handleCategoryClick("Beaches")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
        >
          Beaches
        </button>
        <button
          onClick={() => handleCategoryClick("Cities")}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none"
        >
          Cities
        </button>
      </div>

      <ImageGallery
        images={images}
        isLoading={isLoading}
        submitted={submitted}
      />

      <div className="mb-4">
        {!isLoading && images.length > 0 && currentPage > 1 && (
          <button
            onClick={() => handleButtonClick("prev")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2 focus:outline-none"
          >
            Previous
          </button>
        )}
        {!isLoading && images.length > 0 && currentPage < totalPages && (
          <button
            onClick={() => handleButtonClick("next")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
