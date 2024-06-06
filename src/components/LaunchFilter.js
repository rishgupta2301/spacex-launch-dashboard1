import React from 'react';
import './LaunchFilter.css';

const LaunchFilter = ({ setFilter }) => {
  return (
    <div className="launch-filter">
      <button onClick={() => setFilter('all')}>All</button>
      <button onClick={() => setFilter('upcoming')}>Upcoming</button>
      <button onClick={() => setFilter('past')}>Past</button>
    </div>
  );
};

export default LaunchFilter;
