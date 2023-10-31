import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          
          <a className="navbar-brand" href="/home">ChatAI</a>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Signup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/submitform">Submit image</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">Logout</NavLink>
              </li>
              
            </ul>
          </div>
          
        </div>
      </nav>
  );
}
