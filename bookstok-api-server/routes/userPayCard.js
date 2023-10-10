const express = require('express');
const router = express.Router();
const connection = require('../db'); // MySQL 연결 설정을 불러옵니다.

// 사용자 정보를 가져오는 API 엔드포인트
router.get('/user-info', (req, res) => {
  const sql = 'SELECT nick, userId FROM USER'; // USER 테이블에서 nick과 userId를 선택합니다.

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('데이터베이스 쿼리 오류:', err);
      res.status(500).json({ success: false, message: '서버 오류' });
    } else {
      res.status(200).json({ success: true, data: results });
    }
  });
});

module.exports = router;
