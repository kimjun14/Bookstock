var express = require('express');
var router = express.Router();


const user = require('../models/aucboard.model');

// 경매 검색 조회 [get] ip:12345/api/auctions/search?query(key)=value [req.body에 query]
router.get('/search', async (req, res, next) => {
  try{
    const category = req.query.category;
    const query = req.query.query;
    const mode = req.query.mode;
    const list = await user.auctionSearch(query,mode,category);
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
    if (!recentPages.includes(id)){
      recentPages.push(id);
    }
    if (recentPages.length > 5) {
      recentPages = recentPages.slice(-5);  // 최근 5개만 유지
    }
    res.cookie('recentPages', recentPages, { maxAge: 86400000 });
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매 마무리 [patch] ip:12345/api/auctions/경매번호
router.patch('/:id', async (req, res, next) => {
  try{
    // const aId = Number(req.params.id);
    // const bId = (req.body);
    const list = await user.auctionIdDone(Number(req.params.id),req.body.bid);
    res.status(200).send("통신 완료");
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

// 추천등록  [post] ip:12345/api/auctions/
router.post('/suggest/star', async (req, res, next) => {
  try{
    if(!req.session.userNo){
      return next(new Error('User not authenticated'));
    }
    const userId=req.session.userNo;
    const auctionId=req.body.aId
    await user.addAuctionStar(auctionId,userId);
    res.status(200).send("connection done");
  }catch(err){
    next(err);
  }
});



module.exports = router;
