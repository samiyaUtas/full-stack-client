import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getFlights, updateFlight } from '../Features/FlightSlice';
import './AdminPage.css';
import { useNavigate } from "react-router-dom";

function UpdateFlight() {
  const [flightId, setFlightId] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [airline, setAirline] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleUpdate = async (e) => {
    e.preventDefault();

    const flightDataToUpdate = {
      destination,
      date,
      time,
      price,
      airline,
    };

    try {
      const response = await dispatch(updateFlight({ flightId, ...flightDataToUpdate }));

      if (response.meta.requestStatus === 'fulfilled') { // Check for success
        setErrorMessage('');
        dispatch(getFlights()); // Fetch updated flights
        navigate("/AdminPage");
      } else {
        setErrorMessage(response.error.message || 'Error updating flight'); // Handle errors
      }
    } catch (error) {
      console.error('Error updating flight:', error);
      setErrorMessage('Error updating flight');
    }
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h2>Update Flight</h2>
      </nav>
      <div className="form-container">
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="flightId">Flight ID:</label>
            <input
              type="text"
              id="flightId"
              name="flightId"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="airline">Airline:</label>
            <input
              type="text"
              id="airline"
              name="airline"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Update Flight</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFlight;
