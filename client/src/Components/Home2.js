import React from 'react';
import f2 from "../Images/f2.jpg";
import { Link } from 'react-router-dom';

function Home2() {
  return (
    <div className="homepage">
      <img className="background-image" src={f2} alt="Background" />
      <div className="content">
        <h1>Booking</h1>
        <h3>Book Appointment in Easiest Way!</h3>
        <div className="buttons">
          <Link to="/Login" className='next-button'>Skip</Link>
          <Link to="/Home3" className="next-button">➔</Link>
        </div>
      </div>
    </div>
  );
}

export default Home2;
