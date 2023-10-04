var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const AuctionRouter = require('./aucboard'); // 경매기능
const TradingRouter = require('./trading'); // 경매기능
const searchRouter = require('./search');
const imgUpload = require('./upload'); // 사진 업로드
const testRouter = require('./test'); // 기능 태스트용 라우터
const point = require('./point'); // 북스탁페이 충전 기능
// const mypageRouter=require('./mypage'); // 마이페이지 기능

router.use('/users', userRouter);
router.use('/auctions', AuctionRouter);
router.use('/trading', TradingRouter);
router.use('/search',searchRouter);
router.use('/upload', imgUpload);
router.use('/test', testRouter);
router.use('/point', point);
// router.use('/mypage', mypageRouter); 제작중

module.exports = router;
