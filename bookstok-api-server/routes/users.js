var express = require('express');
var router = express.Router();

const user = require('../models/user.model');

// 사용자 목록 조회 [get] ip:12345/api/users/
router.get('/', async (req, res, next) => {
  try{
    const list = await user.find();
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 사용자 등록 [post] ip:12345/api/users/
router.post('/', async (req, res, next) => {
  try{
    const id = await user.create(req.body);
    res.json({ id });
  }catch(err){
    next(err);
  }
});

// 로그인
// 제대로 구현 하려면 토큰도 돌려줘야하지만 id pwd 검증만 함
router.post('/signin', async (req, res, next) => {
  try{
    const ok = await user.signin(req.body);
    res.json({ ok });
  }catch(err){
    next(err);
  }
});

module.exports = router;
