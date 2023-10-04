var express = require('express');
const mysql = require('mysql2/promise');
const { mysql: mysqlConfig } = require('../config');
var router = express.Router();

// MySQL 연결 풀 생성
const pool = mysql.createPool(mysqlConfig);

// 잔액 조회
router.get('/balance', async (req, res) => {
    const userNo = req.session.userNo;

    if (userNo === undefined) {
        res.status(400).json({ success: false, message: '유저 정보를 찾을 수 없습니다.' });
        return;
    }

    try {
        // 새로운 커넥션 얻기
        const connection = await pool.getConnection();

        const getUserQuery = `SELECT point FROM user WHERE userNo = ?`;
        const [user] = await connection.execute(getUserQuery, [userNo]);

        // 커넥션 반환
        connection.release();

        res.json({ success: true, balance: user[0].point });
    } catch (error) {
        console.error('MySQL 조회 오류:', error);
        res.status(500).json({ success: false, message: '내부 서버 오류' });
    }
});

// 충전 요청 처리
router.post('/', async (req, res) => {
    const { cash } = req.body;
    const userNo = req.session.userNo;  // userId 대신 userNo를 사용하도록 변경

    try {
        // 트랜잭션 시작
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // 여기서 MySQL 업데이트 쿼리를 실행
            const sql = `UPDATE user SET point = point + ? WHERE userNo = ?`;
            const [updateResult] = await connection.execute(sql, [cash, userNo]);

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


// 출금 요청 처리
router.post('/withdraw', async (req, res) => {
    const { accountNumber, point } = req.body;
    const userNo = req.session.userNo;

    if (userNo === undefined || point === undefined) {
        console.error('userNo 또는 point 값이 정의되지 않았습니다.');
        res.status(400).json({ success: false, message: '유효하지 않은 요청' });
        return;
    }

    // 출금 금액이 음수인 경우 처리
    if (parseInt(point) <= 0 || isNaN(parseInt(point))) {
        res.status(400).json({ success: false, message: '출금 금액은 양수이어야 합니다.' });
        return;
    }

    try {
        // 여기서 트랜잭션 시작
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // 여기서 MySQL 업데이트 쿼리 실행하여 포인트 차감
            const sql = `UPDATE user SET point = point - ? WHERE userNo = ?`;
            const [updateResult] = await connection.execute(sql, [point, userNo]);

            if (updateResult.affectedRows > 0) {
                // 커밋
                await connection.commit();

                const getUserQuery = `SELECT point FROM user WHERE userNo = ?`;
                const [user] = await connection.execute(getUserQuery, [userNo]);

                res.json({ success: true, message: '포인트가 성공적으로 출금되었습니다.', newPoint: user[0].point });
            } else {
                res.status(400).json({ success: false, message: '사용자를 찾을 수 없거나 포인트가 출금되지 않았습니다.' });
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
