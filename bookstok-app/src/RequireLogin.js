// RequireLogin.js
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireLogin = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    alert("로그인이 필요합니다."); // 알림창 추가
    navigate("/signin"); // 로그인 페이지로 리다이렉션

    return null; 
  }

  return children;
}


export default RequireLogin;
