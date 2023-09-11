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

// 회원정보 수정
// 비밀번호 변경 페이지에 들어가기 전에 id(userNO)를 받았다 가정
router.put('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const count = await user.update(id, req.body);
    res.json({ count });
  }catch(err){
    next(err);
  }
});

// 비밀번호 변경
// 비밀번호 변경 페이지에 들어가기 전에 id(userNO)를 받았다 가정
router.put('/:id/pwd', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const count = await user.changepwd(id, req.body);
    res.json({ count });
  }catch(err){
    next(err);
  }
});

module.exports = router;
