var express = require('express');
var router = express.Router();

const user = require('../models/mypage.model');

// 검색어 쿼리 받은걸 외부 API 서버로 던짐
router.get('/', async (req, res, next) => {
  try {
    const result=await user.myInfo(req.session.userNo);
    res.status(200).json(list);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
