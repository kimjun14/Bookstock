import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // AuthContext 파일 경로에 따라 수정
import RequireLogin from '../RequireLogin'; // RequireLogin 컴포넌트 import 추가

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <RequireLogin>
                        {/* 로그인이 필요한 경우 RequireLogin 컴포넌트를 렌더링 */}
                        <Component {...props} />
                    </RequireLogin>
                )
            }
        />
    );
}

export default PrivateRoute;
