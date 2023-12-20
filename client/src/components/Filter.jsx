import React, { useState } from 'react';

const Filter = () => {
  const [ageFilter, setAgeFilter] = useState({
    below18: true,
    above18: true,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAgeFilter({
      ...ageFilter,
      [name]: checked,
    });
  };

  return (
    <div>
      <h2 className="text-center text-white mb-4 text-lg">Filter by Age</h2>
      <div className="flex justify-center text-pink-600">
        <label className="checkbox">
          <input
            type="checkbox"
            name="below18"
            checked={ageFilter.below18}
            onChange={handleCheckboxChange}
            // disabled={ageFilter.above18}
          />{' '}
          Age Below 18
        </label>
        <div className="ml-24" ></div> {/* Adding space between checkboxes */}
        <label className="checkbox">
          <input
            type="checkbox"
            name="above18"
            checked={ageFilter.above18}
            onChange={handleCheckboxChange}
            // disabled={ageFilter.below18}
          />{' '}
          Age Above 18
        </label>
      </div>
    </div>
  );
};

export default Filter;
