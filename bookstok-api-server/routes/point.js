var express = require('express');
const mysql = require('mysql2/promise');
const { mysql: mysqlConfig } = require('../config');
var router = express.Router();

// MySQL 연결 풀 생성
const pool = mysql.createPool(mysqlConfig);

// 충전 요청 처리
// routes/point.js

router.post('/', async (req, res) => {
    const { cash } = req.body;
    const userNo = req.session.userNo;  // userId 대신 userNo를 사용하도록 변경

    try {
        // 트랜잭션 시작
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // 여기서 MySQL 업데이트 쿼리를 실행
            console.log('cash:', cash);
            console.log('cash type:', typeof cash);
            console.log('userNo:', userNo); // 새로 추가

            const sql = `UPDATE user SET point = point + ? WHERE userNo = ?`;
            console.log('Update Query:', sql);
            console.log('Update Parameters:', [cash, userNo]);
            const [updateResult] = await connection.execute(sql, [cash, userNo]);
            console.log('Update Result:', updateResult);

            if (updateResult.affectedRows > 0) {
                // 커밋
                await connection.commit();

                const getUserQuery = `SELECT point FROM user WHERE userNo = ?`;
                const [user] = await connection.execute(getUserQuery, [userNo]);

                res.json({ success: true, message: '포인트가 성공적으로 업데이트되었습니다', newPoint: user[0].point });
            } else {
                res.status(400).json({ success: false, message: '사용자를 찾을 수 없거나 포인트가 업데이트되지 않았습니다' });
            }
        } catch (error) {
            // 롤백
            await connection.rollback();
            throw error;
        } finally {
            // 연결 반환
            await connection.release();
        }
    } catch (error) {
        console.error('MySQL 업데이트 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

module.exports = router;
