var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const AuctionRouter = require('./aucboard'); // 경매기능
const searchRouter = require('./search');
const imgUpload = require('./upload'); // 사진 업로드

router.use('/users', userRouter);
router.use('/auctions', AuctionRouter);
router.use('/search',searchRouter);
router.use('/upload', imgUpload);

module.exports = router;
