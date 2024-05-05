import React, { useState } from 'react';

const Filters = ({ applyFilters }) => {
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    isRemote: false,
    techStack: '',
    role: '',
    minBasePay: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFilters({ ...filters, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
  };

  return (
    <div className="filters">
      <h2>Filters</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Min Experience:
          <input
            type="number"
            name="minExperience"
            value={filters.minExperience}
            onChange={handleChange}
          />
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={filters.companyName}
            onChange={handleChange}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={filters.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Remote:
          <input
            type="checkbox"
            name="isRemote"
            checked={filters.isRemote}
            onChange={handleChange}
          />
        </label>
        <label>
          Tech Stack:
          <input
            type="text"
            name="techStack"
            value={filters.techStack}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={filters.role}
            onChange={handleChange}
          />
        </label>
        <label>
          Min Base Pay:
          <input
            type="number"
            name="minBasePay"
            value={filters.minBasePay}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default Filters;
