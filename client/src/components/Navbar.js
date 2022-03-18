import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink className="navbar-brand" to="#">BARTER</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Register</NavLink>
      </li>
       <li className="nav-item">
        <NavLink className="nav-link" to="/Login">Login</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/about">About Me</NavLink>
              </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/AddPost">Add Post</NavLink>
              </li>   
      <li className="nav-item">
        <NavLink className="nav-link" to="/AllPosts">Show all posts</NavLink>
              </li>
        <li className="nav-item">
        <NavLink className="nav-link" to="/Notify">notification</NavLink>
        </li>
              
    </ul>
    
  </div>
</nav>
        </>
    )
};

export default Navbar;
