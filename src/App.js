import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LaunchList from './components/LaunchList';
import './App.css';

const App = () => {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timeframe, setTimeframe] = useState('6 months');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://api.spacexdata.com/v3/launches');
        setLaunches(response.data);
      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
      setLoading(false);
    };

    fetchLaunches();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  const filterLaunches = (launches, filter, timeframe) => {
    const now = new Date();
    let filteredLaunches = launches;

    // Filter by timeframe
    switch (timeframe) {
      case '1 month':
        filteredLaunches = launches.filter(launch => 
          new Date(launch.launch_date_utc) >= new Date(now.setMonth(now.getMonth() - 1))
        );
        break;
      case '6 months':
        filteredLaunches = launches.filter(launch => 
          new Date(launch.launch_date_utc) >= new Date(now.setMonth(now.getMonth() - 6))
        );
        break;
      case '1 year':
        filteredLaunches = launches.filter(launch => 
          new Date(launch.launch_date_utc) >= new Date(now.setFullYear(now.getFullYear() - 1))
        );
        break;
      default:
        break;
    }

    // Filter by launch type
    if (filter === 'upcoming') {
      filteredLaunches = filteredLaunches.filter(launch => new Date(launch.launch_date_utc) > now);
    } else if (filter === 'past') {
      filteredLaunches = filteredLaunches.filter(launch => new Date(launch.launch_date_utc) <= now);
    }

    return filteredLaunches;
  };

  const filteredLaunches = filterLaunches(launches, filter, timeframe);

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://logowik.com/content/uploads/images/314_spacex.jpg" alt="SpaceX" />
      </header>
      <div className="filters">
        <div className="dropdown">
          <label htmlFor="timeframe">Timeframe</label>
          <select id="timeframe" value={timeframe} onChange={handleTimeframeChange}>
            <option value="1 month">Past 1 Month</option>
            <option value="6 months">Past 6 Months</option>
            <option value="1 year">Past 1 Year</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="launch-type">Launch Type</label>
          <select id="launch-type" value={filter} onChange={handleFilterChange}>
            <option value="all">All Launches</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>
      <div className="launch-table-container">
        {loading ? <p>Loading...</p> : <LaunchList launches={filteredLaunches} />}
      </div>
    </div>
  );
};

export default App;
