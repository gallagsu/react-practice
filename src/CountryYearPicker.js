import React, { useState, useEffect, useMemo } from 'react';
import { fetchCountries } from './api/api';
import { Box, Flex, Portal, Select, createListCollection, Spinner, } from "@chakra-ui/react";

function CountryYearPicker({ country, setCountry, year, setYear, error, setError }) {

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries()
      .then(countriesData => {
        setCountries(
          countriesData.map(country => ({
            label: country.name[0].text,
            value: country.isoCode,
          })));
      })
      .catch(err => {
        console.error('Error:', err);
        setError('Something went wrong while fetching country list. Please try again later.');
      });
  }, []);

  const collection = useMemo(
    () => createListCollection({ items: countries }),
    [countries],
  );

  const years = [
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
  ];

  const collection2 = useMemo(
    () => createListCollection({ items: years }),
    [years],
  );

  return (
    <Flex direction={["column", "column", "row"]} gap={4} mb={4}>

      <Box flex={1}>
        <Select.Root
          collection={collection}
          size="sm"
          width="320px"
          value={country}
          onValueChange={(val) => setCountry(val.value)}
        >
          {/* Renders the native <select> for form submissions */}
          <Select.HiddenSelect />

          {/* Optional label */}
          <Select.Label>Select country</Select.Label>

          {/* The clickable control (trigger + indicators) */}
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText>
                {countries.find(c => c.value === country)?.label || "Choose..."}
              </Select.ValueText>
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          {/* The popover itself */}
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collection.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>

      <Box flex={1}>
        <Select.Root
          collection={collection2}
          size="sm"
          width="320px"
          value={year}
          onValueChange={(val) => setYear(val.value)}
        >
          {/* Renders the native <select> for form submissions */}
          <Select.HiddenSelect />

          {/* Optional label */}
          <Select.Label>Select year</Select.Label>

          {/* The clickable control (trigger + indicators) */}
          <Select.Control>
            <Select.Trigger>
            <Select.ValueText>
                {years.find(y => y.value === year)?.label || "Choose..."}
              </Select.ValueText>
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>

          {/* The popover itself */}
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collection2.items.map((item) => (
                  <Select.Item key={item.value} item={item}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </Box>

    </Flex>
  );
}

export default CountryYearPicker;