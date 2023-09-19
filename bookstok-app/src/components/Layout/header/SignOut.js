import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../AuthContext'; // AuthContext 경로 수정
import axios from "axios";

const SignOut = function () {
  const { isLoggedIn, logout } = useAuth(); // 로그인 상태와 로그아웃 함수 가져오기
  const navigate = useNavigate(); // useNavigate 추가

  const handleLogOut = async function (e) {
    e.preventDefault();

    try {
      if (isLoggedIn) {
        // 서버에 로그아웃 요청
        const response = await axios.post('/api/users/logout'); // axios 사용

        if (response.status === 200) {
          // 세션 파기 성공
          localStorage.removeItem('token');
          logout(); // 로그아웃 함수 호출
          navigate('/'); // 메인 페이지로 이동
          console.log('로그아웃 성공 메인페이지로 이동');
        } else {
          alert('서버 오류')
        }
      } else {
        alert('로그인한 상태에서 로그아웃할 수 있습니다.');
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생하였습니다.');
    }
  };

  return (
    <li className="nav-item">
      <Link to="/" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={handleLogOut}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
          <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
          <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
        </svg>
        <span style={{ fontSize: '12px', marginTop: '6px' }}>LOGOUT</span>
      </Link>
    </li>
  );
};

export default SignOut;
