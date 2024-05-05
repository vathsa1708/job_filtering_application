import React, { useState } from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  if (!job) {
    return null;
  }

  const {
    companyName,
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    maxExp,
    maxJdSalary,
    minExp,
    minJdSalary,
    salaryCurrencyCode
  } = job;

  const descriptionToShow = expanded ? jobDetailsFromCompany : `${jobDetailsFromCompany.slice(0, 100)}...`;
  const salaryDisplay = (minJdSalary && maxJdSalary) ? `${minJdSalary} - ${maxJdSalary}` :
  (minJdSalary && !maxJdSalary) ? minJdSalary :
  (!minJdSalary && maxJdSalary) ? maxJdSalary :
  '0';

  return (
    <div className="job-card">
      <h2>{companyName}</h2>
      <h3>{jobRole} </h3>
      <h4>{location}</h4>
      <p>Estimated Salary : {salaryDisplay} {salaryCurrencyCode}</p>
    
      
      <div className={`description ${expanded ? 'expanded' : ''}`}>
        <h4>About Company :</h4>
        <h5>About Us</h5>
        <p>{descriptionToShow}</p>
        {!expanded && <div className="overlay"></div>}
      </div>
      <button className="read-more-button" onClick={toggleDescription}>{expanded ? 'Read Less' : 'Read More'}</button>
      <p className='exp'> Minimum Experience</p>
<p className='min-exp'>
  {minExp ? `${minExp} years` : '0 years'}
</p>
      
      <button className="apply-button"><a href={jdLink} target="_blank" rel="noopener noreferrer">Apply</a></button>
    </div>
  );
}

export default JobCard;
