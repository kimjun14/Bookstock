import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; // useEffect 가져오기

const RequireLogin = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            // 사용자에게 확인 메시지를 표시하고, 확인을 누르면 로그인 페이지로 이동
            navigate('/signin');
            alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        }
    }, [isLoggedIn, navigate]);

    return children;
}

export default RequireLogin;
