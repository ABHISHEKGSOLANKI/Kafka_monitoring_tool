import React from 'react';
import { Link } from 'react-router-dom';
import './navigationbar.css'
//import Navicon from '../../assets/navigatorimages/navicon.svg';

const Navbar = () => {
    return (
<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/">Ramesh Portfolio</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
      <i className="fa fa-bars"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/portfolio">Portfolio</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#">Pre Wedding Photo</Link></li>
            <li><Link className="dropdown-item" to="#">Pre Wedding Video</Link></li>
            <li><Link className="dropdown-item" to="#">Wedding Photography</Link></li>
            <li><Link className="dropdown-item" to="#">Wedding Video</Link></li>
            <li><Link className="dropdown-item" to="#">Candid Photography</Link></li>
            <li><Link className="dropdown-item" to="#">Fashion</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/blog">Blog</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


    );
};

export default Navbar;
