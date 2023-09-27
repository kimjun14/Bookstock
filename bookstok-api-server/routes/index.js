var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const AuctionRouter = require('./aucboard'); // 경매기능
// const TradingRouter = require('./trading'); // 경매기능
const searchRouter = require('./search');
const imgUpload = require('./upload'); // 사진 업로드
const testRouter = require('./test'); // 기능 태스트용 라우터

router.use('/users', userRouter);
router.use('/auctions', AuctionRouter);
// router.use('/trading', TradingRouter);
router.use('/search',searchRouter);
router.use('/upload', imgUpload);
router.use('/test', testRouter);

module.exports = router;
