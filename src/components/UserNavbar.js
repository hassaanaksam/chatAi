import React from 'react';
import { NavLink } from 'react-router-dom';

export default function UserNavbar() {

  function handleLogout () {

    localStorage.removeItem('token')

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          
          <NavLink className="navbar-brand" to="/home">ChatAI</NavLink>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">Home</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={handleLogout}>Logout</a>
              </li>
              
            </ul>
          </div>
          
        </div>
      </nav>
  );
}
