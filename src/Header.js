import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  function logout(){
    localStorage.removeItem("user");
    window.location.reload();
  }
  return (
    <nav className="container navbar navbar-expand-md navbar-light pt-2">
      {/* <Link to="/" className="navbar-brand display-1"><h1>NurlanDev</h1></Link> */}
      <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav mr-auto">
          <Link to="/admin" className="nav-item nav-link h5">Admin</Link>
          <Link to="/register" className="nav-item nav-link h5">Register</Link>
        </div>
        <div className="navbar-nav ml-auto">
          {(localStorage.getItem("user")) ? 
          <div onClick={logout} className="nav-item nav-link h5">Logout</div> :
          <Link to="/login" className="nav-item nav-link h5">Login</Link> }
        </div>
      </div>
    </nav>
  ) 
}

export default Header;