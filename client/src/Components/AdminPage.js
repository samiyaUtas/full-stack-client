import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css'; // Import the common CSS file
import add from '../Images/add.jpg';
import update from '../Images/update.jpg';
import Delete from '../Images/Delete.jpg';
import { FiLogOut } from "react-icons/fi";



function AdminPage() {
  return (
    <div className="admin-page">
        <h2>Admin Page</h2>
            <Link to="/Login"><FiLogOut /></Link>
      <div className="gallery">
        <Link to="/add">
          <img src={add} alt="Add Page" />
        </Link>
        <Link to="/update">
          <img src={update} alt="Update Page" />
        </Link>
        <Link to="/delete">
          <img src={Delete} alt="Delete Page" />
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
