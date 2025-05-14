import './App.css';
import React, { useState, useEffect } from 'react';
import { fetchHolidays } from './api/api';
import HolidayList from './HolidayList';
import CountryYearPicker from './CountryYearPicker';
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

function App() {

  const [country, setCountry] = useState(['NL']);
  const [year, setYear] = useState(['2025']);
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

    <Box p={4}>

      <header>
        <Text as="h1" fontSize="2xl" mb={4}>
          National Holidays
        </Text>
      </header>

      <main id="main-content">
        <CountryYearPicker
          country={country}
          setCountry={setCountry}
          year={year}
          setYear={setYear}
          error={error}
          setError={setError}
        />

        {loading && (
          <Flex justify="center" mb={4}>
            <Spinner size="lg" />
          </Flex>
        )}

        {error && (
          <Box role="alert" bg="red.500" color="white" p={4} borderRadius="md" mb={4}>
            <Text>{error}</Text>
          </Box>
        )}

        <HolidayList holidays={holidays} />
      </main>
    </Box>
  );
}

export default App;