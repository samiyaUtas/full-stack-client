import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the common CSS file

function BookPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state;

  const [tripType, setTripType] = useState('oneWay');
  const [adults, setAdults] = useState(1);
  const [infants, setInfants] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    let totalPrice = adults * flight.price;
    if (tripType === 'roundTrip') {
      totalPrice *= 2;
    }

    navigate('/payment', { state: { flight, totalPrice } });
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h2>Book Flights</h2>
      </nav>
      <div className="form-container">
        <h3>Book Flights</h3>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label>Trip Type:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="oneWay"
                  checked={tripType === 'oneWay'}
                  onChange={() => setTripType('oneWay')}
                />
                One-Way
              </label>
              <label>
                <input
                  type="radio"
                  name="tripType"
                  value="roundTrip"
                  checked={tripType === 'roundTrip'}
                  onChange={() => setTripType('roundTrip')}
                />
                Round-Trip
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Number of Travelers:</label>
            <div>
              <label>Adults:</label>
              <input
                type="number"
                value={adults}
                onChange={(e) => setAdults(parseInt(e.target.value))}
                min={1}
                max={10}
                required
              />
            </div>
            <div>
              <label>Infants:</label>
              <input
                type="number"
                value={infants}
                onChange={(e) => setInfants(parseInt(e.target.value))}
                min={0}
                max={10}
                required
              />
            </div>
          </div>
          <button type="submit" className="book-btn">Book Now</button>
        </form>
      </div>
    </div>
  );
}

export default BookPage;
