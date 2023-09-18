import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const RequireLogin = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // 사용자에게 확인 메시지를 표시하고, 확인을 누르면 로그인 페이지로 이동
        const confirmed = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
        if (confirmed) {
            navigate('/signin');
        }
        return null;
    }

    return children;
}

export default RequireLogin;
