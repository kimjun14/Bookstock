var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const AuctionRouter = require('./aucboard'); // 경매기능

router.use('/users', userRouter);
router.use('/auctions', AuctionRouter);

module.exports = router;
