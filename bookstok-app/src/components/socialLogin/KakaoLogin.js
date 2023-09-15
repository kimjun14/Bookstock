import React from 'react';

function KakaoLogin() {
    const Rest_api_key = '861d57b9824340a31ae9c887397ac901'; // REST API KEY
    const redirect_uri = 'http://localhost:3000/oauth/callback/kakao'; // Redirect URI
    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <div className="col-sm-6">
            <p className="social-connect1">
                <button className="btn text-center mb-1 py-2" onClick={handleLogin}>
                    카카오 계정으로 로그인하기
                </button>
            </p>
        </div>
    );
}

export default KakaoLogin;
