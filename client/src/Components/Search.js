import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlights } from '../Features/FlightSlice';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
  const dispatch = useDispatch();
  const flights = useSelector(state => state.flights.flights);
  const status = useSelector(state => state.flights.status);
  const error = useSelector(state => state.flights.error);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFlights());
  }, [dispatch]);

  const filteredFlights = flights.filter(flight =>
    flight.flightId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookFlight = (flightId) => {
    const flight = filteredFlights.find(flight => flight.flightId === flightId);
    navigate('/book', { state: { flight } });
  };

  return (
    <div className="search-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white">Search Flights</a>
          <form className="d-flex search-form">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search by ID or Destination"
              aria-label="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '20px' }}
              autoComplete="off"
              onFocus={() => setSearchTerm('')}
            />
          </form>
        </div>
      </nav>

      <div className="flight-cards">
        {status === 'loading' && <p className="loading">Loading...</p>}
        {status === 'failed' && <p className="error">Error: {error}</p>}
        {status === 'succeeded' && filteredFlights.map(flight => (
          <div className="flight-card" key={flight.flightId} onClick={() => handleBookFlight(flight.flightId)}>
            <div className="card-body">
              <div className="flight-details">
                <h5 className="flight-id">{flight.flightId}</h5>
                <p className="flight-detail">To: {flight.destination}</p>
                <p className="flight-detail">Departure: {flight.time}</p>
                <p className="flight-detail">Price: ${flight.price}</p>
              </div>
              <div className="airline-info">
                <p className="airline-name">Airline: {flight.airline}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
