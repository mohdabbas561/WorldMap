
import React, { useState, useEffect } from "react";


import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

import axios from "axios";

// Import the CountryInfo component.
import CountryInfo from "./CountryInfo";

const WorldMap = () => {
  // State variables.
  const [countryCode, setCountryCode] = useState("in");
  const [country, setCountry] = useState(null);

  // UseEffect hook to fetch country information when the country code changes.
  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        // Make an HTTP request to the restcountries.com API.
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );

        // Set the country state variable to the response data.
        setCountry(response.data[0]);
      } catch (error) {
        // Log an error if the request fails.
        console.error("Some Error Occurred:", error);
      }
    };
    fetchCountryInfo();
  }, [countryCode]);

  // Function to handle region clicks.
  const handleRegionClick = (event, code) => {

    setCountryCode(code);
  };

  // Return the React component.
  return (
    <div className="container">
      <div className="map">
        <VectorMap
          style={{ width: "100%", height: "100%" }}
          map={worldMill}
          onRegionClick={handleRegionClick}
        />
      </div>
      <div className="country">
        {country && (
          <CountryInfo country={country} />
        )}
      </div>
    </div>
  );
};


export default WorldMap;
