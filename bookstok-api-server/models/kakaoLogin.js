const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_USER_PROFILE_API_URL = "https://kapi.kakao.com/v2/user/me";
const KAKAO_CLIENT_ID = "861d57b9824340a31ae9c887397ac901"; // 카카오 개발자 사이트에서 발급받은 클라이언트 ID
const KAKAO_REDIRECT_URL = "http://localhost:3001/auth/kakao/callback"; // 카카오에 설정한 리디렉션 URI

app.get('/auth/kakao', (req, res) => {
  // 카카오 로그인 요청을 위한 URL 생성
  const authURL = `${KAKAO_OAUTH_TOKEN_API_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

  res.redirect(authURL); // 사용자를 카카오 로그인 페이지로 리디렉션
});

app.get('/auth/kakao/callback', async (req, res) => {
  const code = req.query.code; // 카카오에서 전달받은 인증 코드

  try {
    // 카카오로부터 액세스 토큰 요청
    const tokenResponse = await axios.post(KAKAO_OAUTH_TOKEN_API_URL, null, {
      params: {
        grant_type: "authorization_code",
        client_id: KAKAO_CLIENT_ID,
        redirect_uri: KAKAO_REDIRECT_URL,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token; // 카카오로부터 받은 액세스 토큰

    // 액세스 토큰을 사용하여 사용자 프로필 정보 요청
    const userResponse = await axios.get(KAKAO_USER_PROFILE_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userResponse.data; // 카카오로부터 받은 사용자 정보

    // 여기서 userInfo에는 카카오로부터 받은 사용자 정보가 들어 있습니다.
    // 이 정보를 활용하여 사용자 인증 및 로그인 처리를 수행합니다.
    // 예를 들어, 사용자 정보를 데이터베이스에 저장하고 세션 등을 설정하여 로그인 상태로 만들 수 있습니다.

    res.json(userInfo); // 사용자 정보를 JSON 형식으로 응답
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
