var express = require('express');
var router = express.Router();

const user = require('../models/test.model');

// 메인페이지 기능 추가를 위해 임시로 넣어뒀음. 분리할 예정임
router.get('/mainpagetest', async (req, res, next) => {
    try {
        const list = await user.mainpageRecentSearch();
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
});

// 메인페이지 기능 추가를 위해 임시로 넣어뒀음. 분리할 예정임
router.get('/mainpagetest2', async (req, res, next) => {
    try {
        const list = await user.mainpageRankingSearch();
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
});

// 관리자 기능 추가를 위해 임시로 넣어뒀음.

router.get('/admin1', async (req, res, next) => {
    try {
        const list = await user.mainpageRankingSet();
        res.status(200).send("OK updated");
    } catch (err) {
        next(err);
    }
});

module.exports = router;