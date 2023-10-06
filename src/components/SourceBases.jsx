import React, { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';

function SourceBases() {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Select value={selectedOption} onChange={handleChange}>
        <MenuItem value="option1">Finnish Renovation</MenuItem>
        <MenuItem value="option2">Jobs</MenuItem>
        <MenuItem value="option3">Patents</MenuItem>
        <MenuItem value="option4">Sales Announcement</MenuItem>
        <MenuItem value="option5">Plot Information</MenuItem>
      </Select>
    </div>
  );
}

export default SourceBases;
