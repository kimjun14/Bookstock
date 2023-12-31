import React from "react";
import { Link } from "react-router-dom";
import './signIn.css'

const SignIn = function () {
  return (
    <div className="header-signin">
      <Link to="/signin" className="nav-link text-secondary-emphasis-signin">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="dimgray" className="bi bi-door-open" viewBox="0 0 16 16">
          <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
          <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
        </svg>
        <span style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'dimgray' }}>LOGIN</span>
      </Link>
    </div>
  );
};

export default SignIn;