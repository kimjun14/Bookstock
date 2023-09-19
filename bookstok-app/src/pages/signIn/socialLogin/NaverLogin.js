// auth.js 파일

const axios = require('axios');

const NAVER_OAUTH_TOKEN_API_URL = "https://nid.naver.com/oauth2.0/token";
const NAVER_USER_PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";
const NAVER_CLIENT_ID = "YP_J3Qwb0dVPZzak0x8Q";
const NAVER_REDIRECT_URL = "http://localhost:3000/auth/naver/callback";

export async function naverAuth(code) {
  try {
    const tokenResponse = await axios.post(NAVER_OAUTH_TOKEN_API_URL, null, {
      params: {
        grant_type: "authorization_code",
        client_id: NAVER_CLIENT_ID,
        redirect_uri: NAVER_REDIRECT_URL,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get(NAVER_USER_PROFILE_API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userResponse.data;

    return userInfo;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

module.exports = { naverAuth };
