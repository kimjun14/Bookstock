var express = require('express');
var router = express.Router();

const user = require('../models/mypage.model');

// 마이페이지 접속시 실행되는 정보 전달 라우터
router.get('/myinfo', async (req, res, next) => {
  try {
    const result=await user.myInfo(req.session.userNo);
    res.status(200).json(result);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
