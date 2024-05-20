import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFlight } from '../Features/FlightSlice';
import { useNavigate } from "react-router-dom";

const Delete = () => {
  const [flightId, setFlightId] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.flights);
  const navigate = useNavigate();

  const handleFlightIdChange = (e) => {
    setFlightId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteFlight(flightId)).unwrap();
      setFlightId("");
      navigate("/AdminPage");
    } catch (err) {
      console.error("Error deleting flight:", err);
    }
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h2>Delete Flight</h2>
      </nav>
      <div className="form-container">
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="flightId">Flight ID:</label>
            <input
              type="text"
              id="flightId"
              name="flightId"
              value={flightId}
              onChange={handleFlightIdChange}
            />
          </div>
          <button type="submit">Delete Flight</button>
        </form>
        {status === 'loading' && <p>Deleting flight...</p>}
        {status === 'succeeded' && <p>Flight deleted successfully!</p>}
        {status === 'failed' && (typeof error === 'string' && error.includes('not found')) && <p>Error: Flight with ID {flightId} not found in the database.</p>}
        {status === 'failed' && (!error || (typeof error !== 'string')) && <p>Flight with this ID not available.</p>}
      </div>
    </div>
  );
};

export default Delete;
