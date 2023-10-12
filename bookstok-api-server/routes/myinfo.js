var express = require('express');
var router = express.Router();
const myInfoModel = require('../models/myinfo.model');

// 회원 정보 수정 라우터
router.put('/:id', async (req, res, next) => {
  try {
    const { nick, pwd, userPhone, userAddr, userAddrSub } = req.body;

    // 회원정보 수정
    await myInfoModel.updateUserInfo(req.session.userNo, nick, pwd, userPhone, userAddr, userAddrSub);

    res.status(200).json({ message: "성공" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
