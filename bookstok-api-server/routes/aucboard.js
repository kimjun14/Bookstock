var express = require('express');
var router = express.Router();

const user = require('../models/aucboard.model');

// 경매 검색 조회 [get] ip:12345/api/auctions/search?query(key)=value [req.body에 query]
router.get('/search', async (req, res, next) => {
  try{
    const query = req.query.query;
    const list = await user.auctionSearch(query);
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매 내용 조회 [get] ip:12345/api/auctions/경매번호
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const list = await user.auctionIdSearch(id);
    // 최근 조회한 페이지 정보를 쿠키로 저장
    let recentPages = req.cookies.recentPages || [];
    recentPages.push(id);
    if (recentPages.length > 5) {
      recentPages = recentPages.slice(-5);  // 최근 5개만 유지
    }
    res.cookie('recentPages', recentPages, { maxAge: 86400000 });
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 마이페이지 기능 추가를 위해 임시로 넣어뒀음. 분리할 예정임
router.get('/mypagetest/test', async (req, res, next) => {
  console.log(req.cookies.recentPages)
  try{
    const list = await user.mypageRecentSearch(req.cookies.recentPages);
    // 최근 조회한 페이지 정보를 쿠키로 저장
    res.json(list);
    res.status(200).send("");
  }catch(err){
    next(err);
  }
});

// 입찰 목록 조회 [get] ip:12345/api/auctions/경매번호/bids
router.get('/:id/bids', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const list = await user.auctionIdBidSearch(id);
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매등록  [post] ip:12345/api/auctions/
router.post('/', async (req, res, next) => {
  try{
    const userId=req.session.userNo;
    const nick=req.session.nick
    const id = await user.addAuction(req.body,userId,nick);
    res.json({ id });
  }catch(err){
    next(err);
  }
});

// 입찰등록  [post] ip:12345/api/auctions/경매번호
router.post('/:id', async (req, res, next) => {
  try{
    const auctionid = Number(req.params.id);
    const userId=req.session.userNo;
    const nick=req.session.nick
    const result = await user.addBid(req.body,auctionid,userId,nick);
    res.status(200).send(result);
  }catch(err){
    next(err);
  }
});



module.exports = router;
