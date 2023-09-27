var express = require('express');
var router = express.Router();

const model = require('../models/trading.model');

// 구매자의 주소 입력
router.get('/buy/addr', async (req, res, next) => {
    try{
        const result = await model.addrCheck()
        res.status(200).json(result[0]);
    }catch(err){
        console.log(err);
        next(err);
    }
})

router.patch('/buy/addr', async (req, res, next) => {
    try{
        await model.addrbuyerChange(req.body)
    }catch(err){
        console.log(err);
        next(err);
    }
    res.status(200).send("통신 성공");
})

// 판매자의 송장 입력
router.get('/sell/track', async (req, res, next) => {
    try{
        const result = await model.trackCheck()
        res.status(200).json(result[0]);
    }catch(err){
        console.log(err);
        next(err);
    }
})

router.patch('/sell/track', async (req, res, next) => {
    try{
        await model.trackSellerChange(req.body)
    }catch(err){
        console.log(err);
        next(err);
    }
    res.status(200).send("통신 성공");
})

// 통장 입력
router.get('/account', async (req, res, next) => {
    try{
        const result = await model.accountCheck()
        res.status(200).json(result[0]);
    }catch(err){
        console.log(err);
        next(err);
    }
})

router.patch('/account', async (req, res, next) => {
    try{
        await model.accountChange(req.body)
    }catch(err){
        console.log(err);
        next(err);
    }
    res.status(200).send("통신 성공");
})

module.exports = router;