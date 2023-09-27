var express = require('express');
var router = express.Router();

const model = require('../models/trading.model');

router.get('/addr', async (req, res, next) => {
    try{
        const result = await model.addrCheck()
        res.status(200).json(result[0]);
    }catch(err){
        console.log(err);
        next(err);
    }
})

router.patch('/addr', async (req, res, next) => {
    console.log(req.body);
    try{
        await model.addrbuyerChange(req.body)
    }catch(err){
        console.log(err);
        next(err);
    }
    res.status(200).send("통신 성공");
})

module.exports = router;