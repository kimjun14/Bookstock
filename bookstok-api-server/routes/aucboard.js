var express = require('express');
var router = express.Router();

const user = require('../models/aucboard.model');

// 경매 목록 조회 [get] ip:12345/api/auctions/search?query(key)=value [req.body에 query]
router.get('/search', async (req, res, next) => {
  try{
    const query = req.query.query;
    const list = await user.auctionSearch(query);
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매 목록 조회 [get] ip:12345/api/auctions/경매번호
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const list = await user.auctionIdSearch(id);
    res.json(list);
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
