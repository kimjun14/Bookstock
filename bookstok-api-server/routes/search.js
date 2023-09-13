var express = require('express');
var axios = require('axios');
var router = express.Router();

// 검색어 쿼리 받은걸 외부 API 서버로 던짐
router.post('/', async (req, res, next) => {
  const { query } = req.body;

  const apiKey = "e1380f087a4c7fe6f2b44760c10067321066aed7d8916320d9be31b5801ea783";
  try {
    // 외부 API에 요청
    const response = await axios.get('https://www.nl.go.kr/seoji/SearchApi.do',{
      params: 
      { 
        cert_key: apiKey,
        result_style:"json",
        page_no: 1,
        page_size:10,
        title: query
      }
    })
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
