import React, { useState } from 'react';

const DropdownFilter = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropdownFilter;
