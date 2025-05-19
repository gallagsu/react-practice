import axios from 'axios';

const API_URL = 'https://openholidaysapi.org/PublicHolidays';
const COUNTRY_API_URL = 'https://openholidaysapi.org/Countries';

export const fetchHolidays = async (countryCode, year) => {
  try {
    const response = await axios.get(`${API_URL}?countryIsoCode=${countryCode}&languageIsoCode=EN&validFrom=${year}-01-01&validTo=${year}-12-31`);
    return response.data;
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return []; // Return an empty array if there's an error
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axios.get(`${COUNTRY_API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return []; // Return an empty array if there's an error
  }
};