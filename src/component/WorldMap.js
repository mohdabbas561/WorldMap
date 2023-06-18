import React, { useState, useEffect } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import axios from "axios";
import "../styles/styles.css"

import CountryInfo from "./CountryInfo";

const WorldMap = () => {
  const [countryCode, setCountryCode] = useState("in");
  const [country, setCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Some Error Occurred:", error);
      }
    };
    fetchCountryInfo();
  }, [countryCode]);

  const handleRegionClick = (event, code) => {
    setCountryCode(code);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Make an API request to search for the country based on the search query.
    const searchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${searchQuery}`
        );
        if (response.data.length > 0) {
          setCountryCode(response.data[0].cca3);
          setSearchQuery("");
        } else {
          console.log("No country found.");
        }
      } catch (error) {
        console.error("Some Error Occurred:", error);
      }
    };
    searchCountry();
  };
  

  return (
    <div className="container">
      <div className="map">
      <div className="search">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search Any Country"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
        <VectorMap
          style={{ width: "100%", height: "100%" }}
          map={worldMill}
          onRegionClick={handleRegionClick}
        />
      </div>
      
      <div className="country">
        {country && <CountryInfo country={country} />}
      </div>
    </div>
  );
};

export default WorldMap;
