import React from 'react';
import f3 from "../Images/f3.jpg";
import { Link } from 'react-router-dom';

function Home3() {
  return (
    <div className="homepage">
      <img className="background-image" src={f3} alt="Background" />
      <div className="content">
        <h1>Get alert</h1>
        <h3>Get notifications when flight is booked.</h3>
        <div className="buttons">
          <Link to="/Login" className='next-button'>Skip</Link>
          <Link to="/Login" className="next-button">➔</Link>
        </div>
      </div>
    </div>
  );
}

export default Home3;
