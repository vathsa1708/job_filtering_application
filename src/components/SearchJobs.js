import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../actions/JobActions';
import JobCard from './JobCard';
import '../styles/SearchJobs.css';

const SearchJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector(state => state.job);
  const [filters, setFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: ''
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(fetchJobs(100, 0)); // Fetch the first 100 jobs initially
  }, [dispatch]);

  const applyFilters = useCallback(() => {
    if (jobs && jobs.jdList) {
      const filtered = jobs.jdList.filter(job => {
        const minExp = job.minExp;
        const maxExp = job.maxExp;
        const minSalary = job.minJdSalary !== null ? job.minJdSalary : Number.MIN_SAFE_INTEGER;
        const maxSalary = job.maxJdSalary !== null ? job.maxJdSalary : Number.MAX_SAFE_INTEGER;


        const minExperienceFilter = parseInt(filters.minExperience);
        const minBasePayFilter = parseInt(filters.minBasePay);

        return (
          (!filters.minExperience || 
            (typeof minExp === 'number' && minExperienceFilter >= minExp && minExperienceFilter <= maxExp))
              &&
          (!filters.companyName || (job.companyName && job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()))) &&
          (!filters.location || (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()))) &&
          (!filters.remote || (job.remote && job.remote.toLowerCase() === filters.remote.toLowerCase())) &&
          (!filters.techStack || (job.techStack && job.techStack.toLowerCase().includes(filters.techStack.toLowerCase()))) &&
          (!filters.role || (job.jobRole && job.jobRole.toLowerCase().includes(filters.role.toLowerCase()))) &&
          (!filters.minBasePay || (typeof minSalary === 'number' && typeof maxSalary === 'number'&& minSalary >= minBasePayFilter && minBasePayFilter<=maxSalary))
        );
      });
      setFilteredJobs(filtered);
    }
  }, [jobs, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="search-jobs">
      <h1>Job Listings</h1>
      <div className="filters">
        <input type="text" className="filter-input" name="minExperience" placeholder="Min Experience" value={filters.minExperience} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="companyName" placeholder="Company Name" value={filters.companyName} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="location" placeholder="Location" value={filters.location} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="remote" placeholder="Remote/On-site" value={filters.remote} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="techStack" placeholder="Tech Stack" value={filters.techStack} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="role" placeholder="Role" value={filters.role} onChange={handleFilterChange} />
        <input type="text" className="filter-input" name="minBasePay" placeholder="Min Base Pay" value={filters.minBasePay} onChange={handleFilterChange} />
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <div className="filtered-job-list">
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
}

export default SearchJobs;
