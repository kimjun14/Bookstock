var express = require('express');
var axios = require('axios');
var router = express.Router();

// 검색어 쿼리 받은걸 외부 API 서버로 던짐
router.post('/', async (req, res, next) => {
  const { query } = req.body;

  const apiId = "H38Bmj5zQN_R3r2xt1w0";
  const apiSecret = "qcEHvvlOdU";
  try {
    // 외부 API에 요청
    const response = await axios.get('https://openapi.naver.com/v1/search/book.json',{
      headers: { 
        'X-Naver-Client-Id': apiId, 
        'X-Naver-Client-Secret': apiSecret
      },
      params: {
        query: query,
        display: 10,
        sort: "sim"
      }
    })
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
