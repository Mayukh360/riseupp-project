import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(query); //Instead of taking data after every keystroke, it will take data after submitting the form
    setQuery(""); //Resetting the input field
  };

  return (
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
  );
}
