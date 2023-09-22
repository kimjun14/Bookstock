const express = require('express');
const router = express.Router();
const crypto=require('crypto');


const user = require('../models/user.model');
const { clear } = require('console');

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
    console.log(req.body);
    await user.create(req.body);
    res.status(200).send({ message: '회원가입 성공' });
  }catch(err){
    res.status(400).send({ message: '회원가입 실패' });
  }
});


// 로그인
// 제대로 구현 하려면 토큰도 돌려줘야하지만 id pwd 검증만 함
router.post('/signin', async (req, res, next) => {
  try {
    const { userId, pwd } = req.body; // 클라이언트에서 보낸 아이디와 비밀번호

    // 클라이언트로부터 받은 비밀번호를 해싱
    const sha1 = crypto.createHash('sha1').update(pwd).digest('base64');

    const loginResult = await user.signin({ userId, pwd : sha1 });
    console.log(loginResult);
    if (loginResult) {
      // 아이디와 비밀번호가 일치하는 경우 세션에 사용자 아이디를 저장
      req.session.userId = userId;
      req.session.userNo = loginResult.userNo;
      req.session.nick = loginResult.nick;
      console.log("새션 생성", req.session);
      console.log("새션 아이디", req.sessionID);
      res.status(200).send({ message: 'SUCCESS' });
    } else {
      // 아이디 또는 비밀번호가 일치하지 않는 경우
      res.status(401).send({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (err) {
    next(err);
  } 
  // finally {
  //   // cookie=res.getHeaders()['set-cookie']
  //   console.log("입력한 userId 확인", req.session.userId);    
  // }  // response의 헤더 확인하려면 이렇게
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

// 로그아웃
router.post('/logout', (req, res, next) => {
  try {
    if (req.session.userId) {
      // 사용자가 로그인한 상태인 경우에만 세션을 파기합니다.
      req.session.destroy((err) => {
        if (err) {
          console.error('세션 파기 오류:', err);
          return res.status(500).send({ message: '세션 파기 오류' });
        }
        
        console.log('세션 파기 성공');
        res.status(200).send({ message: '로그아웃 성공' });
      });
    } else {
      // 사용자가 로그인하지 않은 상태인 경우
      res.status(401).send({ message: '로그인한 사용자만 로그아웃할 수 있습니다.' });
    }
  } catch (err) {
    next(err);
  }
});




module.exports = router;
