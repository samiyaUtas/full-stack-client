import React from 'react';
import f1 from "../Images/f1.jpg";
import { Link } from 'react-router-dom';

function Home1() {
  return (
    <div className="homepage">
      <img className="background-image" src={f1} alt="Background" />
      <div className="content">
        <h1>Search Flights</h1>
        <h3>Explore The Beautiful World!</h3>
        <div className="buttons">
          <Link to="/Login" className='next-button'>Skip</Link>
          <Link to="/Home2" className="next-button">➔</Link>
        </div>
      </div>
    </div>
  );
}

export default Home1;
