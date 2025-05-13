import React from 'react';

function HolidayList({ holidays }) {
    return (
        <ul>
            {holidays.length > 0 ? (
                holidays.map((holiday, index) => (
                    <li key={index}>
                        {holiday.startDate}: {holiday.name[0].text} {/* Access 'text' if 'name' is an object */}
                    </li>
                ))
            ) : (
                <p>No holidays found for the selected country and year.</p>
            )}
        </ul>
    );
}

export default HolidayList;