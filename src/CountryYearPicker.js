import React, { useState, useEffect } from 'react';
import { fetchCountries } from './api/api';

function CountryYearPicker({country, setCountry, year, setYear}) {
    
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchCountries().then(countriesData => {
          setCountries(countriesData);
          console.log(countriesData);
        });
      }, []);

    return (
<>
        <select>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        </select>

       <select>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
        </select></>
    );
}

export default CountryYearPicker;