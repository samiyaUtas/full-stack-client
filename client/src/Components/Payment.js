import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminPage.css'; // Import the common CSS file

function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const location = useLocation();
  const { flight, totalPrice } = location.state;
  const navigate = useNavigate(); // Move useNavigate inside the component

  const handleSubmit = (e) => {
    e.preventDefault();
    // CVV validation
    if (cvv.length !== 3) {
      alert('CVV must be 3 digits');
      return;
    }
    // Card number validation
    if (cardNumber.length !== 16) {
      alert('Card Number must be 16 digits');
      return;
    }
    navigate("/UserPage"); // Use navigate to go to UserPage
    // Proceed with payment processing
    console.log('Payment submitted');
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h3>Payment</h3>
      </nav>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              maxLength="3"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              min={new Date().toISOString().split('T')[0]} // Allow only future dates
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <p>Total Price: ${totalPrice}</p>
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>
    </div>
  );
}

export default Payment;
