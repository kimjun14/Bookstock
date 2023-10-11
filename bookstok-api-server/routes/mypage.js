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

// 최근 접속한 페이지를 보여줌
router.get('/recentpage', async (req, res, next) => {
  console.log(req.cookies.recentPages)
  try {
      const list = await user.mypageRecentSearch(req.cookies.recentPages);
      res.status(200).json(list);
  } catch (err) {
      next(err);
  }
});

// 관심등록한 페이지를 보여줌
router.get('/favpage', async (req, res, next) => {
  console.log(req.session.userNo)
  try {
      const list = await user.mypageFavoriteSearch(req.session.userNo);
      res.status(200).json(list);
  } catch (err) {
      next(err);
  }
});

router.get('/auction', async (req, res, next) => {
  try {
    const result=await user.myAuction(req.session.userNo);
    res.status(200).json(result);
  }
  catch(err){
    next(err);
  }
});

router.get('/auctionbid', async (req, res, next) => {
  try {
    const result=await user.myAuctionBid(req.session.userNo);
    res.status(200).json(result);
  }
  catch(err){
    next(err);
  }
});

router.get('/buyer', async (req, res, next) => {
  try {
    const result=await user.myBookBuyer(req.session.userNo);
    res.status(200).json(result);
  }
  catch(err){
    next(err);
  }
});

module.exports = router;
