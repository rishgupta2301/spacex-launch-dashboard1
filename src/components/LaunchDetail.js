import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LaunchDetail.css';

const LaunchDetail = ({ launch, onClose }) => {
  const [rocket, setRocket] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchRocket = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v3/rockets/${launch.rocket.rocket_id}`);
        setRocket(response.data);
      } catch (error) {
        console.error('Error fetching rocket data:', error);
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://api.spacexdata.com/v3/launchpads/${launch.launch_site.site_id}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchRocket();
    fetchLocation();
  }, [launch.rocket.rocket_id, launch.launch_site.site_id]);

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{launch.mission_name}</h2>
        <div className={`status ${launch.upcoming ? 'upcoming' : (launch.launch_success ? 'success' : 'failed')}`}>
          {launch.upcoming ? 'Upcoming' : (launch.launch_success ? 'Success' : 'Failed')}
        </div>
        <button onClick={onClose}>X</button>
      </div>
      <div className="modal-content">
        <p>{launch.details}</p>
        <div className="details">
          <div>
            <strong>Flight Number:</strong> {launch.flight_number}
          </div>
          <div>
            <strong>Mission Name:</strong> {launch.mission_name}
          </div>
          <div>
            <strong>Rocket Type:</strong> {rocket ? rocket.rocket_type : 'Loading...'}
          </div>
          <div>
            <strong>Rocket Name:</strong> {rocket ? rocket.rocket_name : 'Loading...'}
          </div>
          <div>
            <strong>Manufacturer:</strong> {rocket ? rocket.manufacturer : 'Loading...'}
          </div>
          <div>
            <strong>Nationality:</strong> {rocket ? rocket.country : 'Loading...'}
          </div>
          <div>
            <strong>Launch Date:</strong> {new Date(launch.launch_date_utc).toLocaleString()}
          </div>
          <div>
            <strong>Payload Type:</strong> {launch.rocket.second_stage.payloads[0].payload_type}
          </div>
          <div>
            <strong>Orbit:</strong> {launch.rocket.second_stage.payloads[0].orbit}
          </div>
          <div>
            <strong>Launch Site:</strong> {location ? location.site_name_long : 'Loading...'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
