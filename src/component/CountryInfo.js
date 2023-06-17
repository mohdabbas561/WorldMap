import React from "react";
import "../styles/styles.css"

const CountryInfo = ({ country }) => {
  if (!country) return null;

  const {
    flags,
    name,
    capital,
    currencies,
    area,
    population,
    continents,
    subregion
  } = country;

  return (
    <div className="country">
      <img src={flags.png} alt="" />
      <h2>{name.common}</h2>
      <ul>
        <li>Capital City: <span>{capital[0]} </span> </li>
        <li>Sub Region: <span>{subregion}</span> </li>
        <li>Currency: <span>{currencies[Object.keys(currencies)[0]].name}</span></li>
        <li>Population: <span>{population}</span></li>
        <li>Continent Name: <span>{continents}</span></li>
        <li>Demographic Area: <span>{area} Square KM.</span> </li>
      </ul>
    </div>
  );
};

export default CountryInfo;
