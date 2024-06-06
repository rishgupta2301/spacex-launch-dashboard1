import React, { useState } from 'react';
import LaunchDetail from './LaunchDetail';
import './LaunchList.css';

const LaunchList = ({ launches, filter, loading }) => {
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const launchesPerPage = 12;

  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch);
  };

  const filteredLaunches = launches.filter((launch) => {
    if (filter === 'upcoming') {
      return launch.upcoming;
    } else if (filter === 'past') {
      return !launch.upcoming;
    } else {
      return true;
    }
  });

  const indexOfLastLaunch = currentPage * launchesPerPage;
  const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
  const currentLaunches = filteredLaunches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const totalPages = Math.ceil(filteredLaunches.length / launchesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <table className="launch-table">
        <thead>
          <tr>
            <th>No:</th>
            <th>Launched (UTC)</th>
            <th>Location</th>
            <th>Mission</th>
            <th>Orbit</th>
            <th>Launch Status</th>
            <th>Rocket</th>
          </tr>
        </thead>
        <tbody>
          {currentLaunches.map((launch, index) => (
            <tr key={launch.flight_number} onClick={() => handleLaunchClick(launch)} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{index + 1 + (currentPage - 1) * launchesPerPage}</td>
              <td>{new Date(launch.launch_date_utc).toLocaleString()}</td>
              <td>{launch.launch_site.site_name}</td>
              <td>{launch.mission_name}</td>
              <td>{launch.rocket.second_stage.payloads.map(payload => payload.orbit).join(', ')}</td>
              <td className={`launch-status ${launch.upcoming ? 'upcoming' : (launch.launch_success ? 'success' : 'failed')}`}>
                {launch.upcoming ? 'Upcoming' : (launch.launch_success ? 'Success' : 'Failed')}
              </td>
              <td>{launch.rocket.rocket_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
      {selectedLaunch && (
        <div className="modal-container">
          <LaunchDetail launch={selectedLaunch} onClose={() => setSelectedLaunch(null)} />
        </div>
      )}
    </div>
  );
};

export default LaunchList;
