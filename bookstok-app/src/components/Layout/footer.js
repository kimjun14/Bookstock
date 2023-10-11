import React from "react";
const Footer = function () {
  return (
    <footer style={{ backgroundColor: 'transparent', marginTop: '7rem' }}>
      <div className="container d-flex justify-content-center" style={{ backgroundColor: 'white' }}>
        <a className="nav-link active text-secondary-emphasis mx-3" aria-current="page" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1187CF" className="bi bi-facebook" viewBox="0 0 16 16">
            {/* Facebook SVG */}
          </svg>
        </a>
        <a className="nav-link active text-secondary-emphasis mx-3" aria-current="page" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1187CF" className="bi bi-instagram" viewBox="0 0 16 16">
            {/* Instagram SVG */}
          </svg>
        </a>
        <a className="nav-link active text-secondary-emphasis mx-3" aria-current="page" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1187CF" className="bi bi-youtube" viewBox="0 0 16 16">
            {/* YouTube SVG */}
          </svg>
        </a>
        <a className="nav-link active text-secondary-emphasis mx-3" aria-current="page" href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1187CF" className="bi bi-github" viewBox="0 0 16 16">
            {/* GitHub SVG */}
          </svg>
        </a>
      </div>
  
      {/* Copyright */}
      <div className="text-center text-white p-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', marginTop: '5rem' }}>
        © 2023 Copyright:
        <a className="text-white text-decoration-none" href="/">RARIBOOKS</a>
      </div>
      {/* Copyright */}
    </footer>
  );
}
export default Footer;
