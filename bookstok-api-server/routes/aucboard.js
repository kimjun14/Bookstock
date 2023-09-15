var express = require('express');
var router = express.Router();

const user = require('../models/aucboard.model');

// 경매 목록 조회 [get] ip:12345/api/auctions/경매번호
router.get('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const list = await user.auctionSearch(id);
    res.json(list);
  }catch(err){
    next(err);
  }
});

// 경매등록  [post] ip:12345/api/auctions/
router.post('/', async (req, res, next) => {
  try{
    const id = await user.addAuction(req.body);
    res.json({ id });
  }catch(err){
    next(err);
  }
});

// 입찰등록  [post] ip:12345/api/auctions/경매번호
router.post('/:id', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    const result = await user.addBid(req.body,id);
    res.json({ result });
  }catch(err){
    next(err);
  }
});



module.exports = router;
