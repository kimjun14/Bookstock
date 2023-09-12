var express = require('express');
var router = express.Router();

const userRouter = require('./users');
const AuctionRouter = require('./aucboard'); // 경매기능
const searchRouter = require('./search');

router.use('/users', userRouter);
router.use('/auctions', AuctionRouter);
router.use('/search',searchRouter);

module.exports = router;
