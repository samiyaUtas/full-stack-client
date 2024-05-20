import React from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css'; // Import the common CSS file
import search from '../Images/search.jpg';
import book from '../Images/book.jpg';
import payment from '../Images/payment.jpg';
import { FiLogOut } from "react-icons/fi";


function UserPage() {
  return (
    <div className="user-page">
        <h2>User Page</h2>
        <Link to="/Login"><FiLogOut /></Link>
      <div className="gallery">
        <Link to="/search">
          <img src={search} alt="search Page" />
        </Link>
        <Link to="/book">
          <img src={book} alt="book Page" />
        </Link>
        <Link to="/payment">
          <img src={payment} alt="payment Page" />
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
