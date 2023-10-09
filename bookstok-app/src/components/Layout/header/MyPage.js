import React from "react";
import { Link } from "react-router-dom"
import './MyPage.css'

const MyPage = function () {
return (
  <div className="header-mypage">
    <Link to="/mypage" className="nav-link text-secondary-emphasis-mypage" >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="dimgray" className="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
      </svg>
      <span style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'dimgray' }}>MYPAGE</span>
    </Link>
  </div>
);
};

export default MyPage;