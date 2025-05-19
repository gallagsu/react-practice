import React from 'react';
import { Box, Text, VStack } from "@chakra-ui/react";

function HolidayList({ holidays }) {
    return (
        <section>
            <VStack spacing={4}>
                {holidays.length === 0 ? (
                    <Text>No holidays found for the selected country and year.</Text>
                ) : (
                    holidays.map((holiday, index) => (
                        <Box key={index} p={4} border="1px" borderRadius="md" borderColor="gray.200">
                            <Text>{holiday.name[0].text}</Text>
                            <Text>{holiday.startDate}</Text>
                        </Box>
                    ))
                )}
            </VStack>
        </section>
    );
}

export default HolidayList;