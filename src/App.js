import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchHolidays } from './api/api';
import HolidayList from './HolidayList';
import CountryYearPicker from './CountryYearPicker';

function App() {

  const [country, setCountry] = useState('NL');
  const [year, setYear] = useState('2025');
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    // Call fetchHolidays and log the result to the console
    fetchHolidays(country, year).then(holidaysData => {
      setHolidays(holidaysData);
    });
  }, [country, year]);

  return (
    <div className="App">
      <header className="App-header">
        HEADER
      </header>
      <main>
      <CountryYearPicker country={country, setCountry, year, setYear} />
        <HolidayList holidays={holidays} />
      </main>
    </div>
  );
}

export default App;
