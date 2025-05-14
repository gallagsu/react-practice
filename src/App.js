import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchHolidays } from './api/api';
import HolidayList from './HolidayList';
import CountryYearPicker from './CountryYearPicker';

function App() {

  const [country, setCountry] = useState('NL');
  const [year, setYear] = useState('2025');
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchHolidays(country, year).then(holidaysData => {
      setHolidays(holidaysData);
      setError(null);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error:', err);
      setError('Something went wrong while fetching holidays. Please try again later.')
      setLoading(false);
    });
  }, [country, year]);

  return (
    <div className="App">
      <header className="App-header">
        HEADER
      </header>
      <main>
        <CountryYearPicker
          country={country}
          setCountry={setCountry}
          year={year}
          setYear={setYear}
          error={error}
          setError={setError}
        />
        {loading && <p className="Loading">Loading holidays...</p>}
        {error && <p className="Error">{error}</p>}
        <HolidayList holidays={holidays} />
      </main>
    </div>
  );
}

export default App;