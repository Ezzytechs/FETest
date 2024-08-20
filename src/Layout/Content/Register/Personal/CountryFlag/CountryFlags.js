import React, { useState } from "react";
import CountryList from "country-list-with-dial-code-and-flag";
import Flag from "react-world-flags";
import "./CountryFlags.scss";

const CountryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState(CountryList.getAll());
  const [selectedCountry, setSelectedCountry] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedCountry ? (
          <>
            <Flag code={selectedCountry.code} className="selected-flag" />
          </>
        ) : (
          <span>
            <Flag code={"NG"} className="selected-flag" />
          </span>
        )}
        {/* <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span> */}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {countries.map((country) => (
            <li
              key={country.data.code}
              onClick={() => handleSelect(country)}
              className="dropdown-item"
            >
              <Flag code={country.data.code} className="dropdown-flag" />
              <span>{country.data.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryDropdown;
