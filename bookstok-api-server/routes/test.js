var express = require('express');
var router = express.Router();

const user = require('../models/test.model');

// 마이페이지 기능 추가를 위해 임시로 넣어뒀음. 분리할 예정임
router.get('/mypagetest', async (req, res, next) => {
    console.log(req.cookies.recentPages)
    try {
        const list = await user.mypageRecentSearch(req.cookies.recentPages);
        // 최근 조회한 페이지 정보를 쿠키로 저장
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
});

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

module.exports = router;