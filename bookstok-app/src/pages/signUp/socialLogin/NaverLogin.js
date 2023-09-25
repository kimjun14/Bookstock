const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const NAVER_OAUTH_TOKEN_API_URL = "https://nid.naver.com/oauth2.0/token";
const NAVER_USER_PROFILE_API_URL = "https://openapi.naver.com/v1/nid/me";
const NAVER_CLIENT_ID = "YP_J3Qwb0dVPZzak0x8Q";
const NAVER_REDIRECT_URL = "http://localhost:3000/auth/naver/callback";

app.get('/auth/naver', (req, res) => {
    const authURL =
        `${NAVER_OAUTH_TOKEN_API_URL}?client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URL}&response_type=code`;

    res.redirect(authURL);
});

app.get('/auth/naver/callback', async (req, res) => {
    const code = req.query.code;

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

        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
