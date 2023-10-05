const express = require('express');
const router = express.Router();
const lostpwd = require('../models/lostpwd.model');

// ip:12345/api/lostPwd/
// 비밀번호 변경

router.put('/', async (req, res, next) => {
  try {
    const { userId, pwd } = req.body;
    const user = await lostpwd.getUserByEmail(userId);

    if (!user) {
      console.log(res.body);
      return res.status(404).json({ error: '사용자 없음' });
    }

    console.log('Generated Password:', pwd);

    const count = await lostpwd.changepwd(userId, pwd);

    res.json({ count, pwd });
    console.log('ID', userId, '기존pd', pwd, count);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
