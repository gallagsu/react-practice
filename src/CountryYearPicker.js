import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/api';

function CountryYearPicker({ country, setCountry, year, setYear, error, setError }) {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries().then(countriesData => {
      setCountries(countriesData);
    })
    .catch(err => {
      console.error('Error:', err);
      setError('Something went wrong while fetching country list. Please try again later.')
    });
  }, []);

  return (
    <div>
      <select onChange={(e) => setCountry(e.target.value)} value={country}>
        {countries.length > 0 ? (
          countries.map((country, index) => (
            <option key={index} value={country.isoCode}>
              {country.name[0].text}
            </option>
          ))
        ) : (
          <option>No countries found.</option>
        )}
      </select>
      {error && <p className="Error">{error}</p>}

      <select onChange={(e) => setYear(e.target.value)} value={year}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
}

export default CountryYearPicker;