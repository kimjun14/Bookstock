import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../AuthContext'; // AuthContext 경로 수정
import axios from "axios";
import './SignOut.css'

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true
});

const SignOut = function () {
  const { isLoggedIn, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기
  const navigate = useNavigate(); // useNavigate 추가

  const handleLogOut = async function (e) {
    e.preventDefault();

    try {
      if (isLoggedIn) {
        // 서버에 로그아웃 요청
        const response = await axiosConnect.post('/users/logout')
        logout(); // 로그아웃 함수 호출
        navigate('/'); // 메인 페이지로 이동
        console.log(response.data.message, response);
      } else {
        alert('로그인한 상태에서만 로그아웃할 수 있습니다.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생하였습니다.');
      logout()  // 서버가 도중에 재시작해서 프론트단은 로그인한 state인데 서버엔 세션이 없는경우니 그냥 로그아웃시킴
    }
  };

  return (
    <div className="header-signout">
      <Link to="/" className="nav-link text-secondary-emphasis-signout" onClick={handleLogOut}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="dimgray" className="bi bi-door-closed" viewBox="0 0 16 16">
          <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
        <span style={{ fontSize: '0.8rem', marginTop: '0.2rem', color: 'dimgray' }}>LOGOUT</span>
      </Link>
    </div>
  );
};

export default SignOut;
