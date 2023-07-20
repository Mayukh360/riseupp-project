import React, { useEffect, useState } from "react";
import axios from "axios";

const ACCESS_KEY = "iEKEPOqCiKe3USRs6LUqasUdI_H8iOiOU-ZuAm52G4I";
const API_URL = "https://api.unsplash.com/search/photos";

export default function Gallery() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [submitted, setSubmitted] = useState(''); 

  const fetchData = async () => {
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
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setQuery(event.target.value);
  };
  useEffect(()=>{
    if(submitted){
        fetchData();
    }
  },[submitted])

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    setSubmitted(query)
    setQuery('')
    // fetchData(); // Call the API when the form is submitted
  };
  const onMuntainClick=()=>{
    setSubmitted('mountain');
  }
  const onFlowerClick=()=>{
    setSubmitted('flower');
  }
  const onBeachesClick=()=>{
    setSubmitted('beaches');
  }
  const onCitiesClick=()=>{
    setSubmitted('cities');
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={query} onChange={handleSearchInputChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <button onClick={onMuntainClick}>Mountain</button>
        <button onClick={onFlowerClick}>Flowers</button>
        <button onClick={onBeachesClick}>Beaches</button>
        <button onClick={onCitiesClick}>Cities</button>
      </div>
      <div>
        {submitted && <h2>Heading: {submitted}</h2>}{" "}
        
        {images &&
          images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description}
            />
          ))}
      </div>
    </div>
  );
}

