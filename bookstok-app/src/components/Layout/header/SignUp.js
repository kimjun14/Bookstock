import { Link } from "react-router-dom";

const SigUp = function () {
  return (
    <div className="nav-item">
      <Link to="/signup" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="dimgray" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
          <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
        </svg>
        <span style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'dimgray' }}>SIGN UP</span>
      </Link>
    </div>
  )
};

export default SigUp;