const pool = require('./pool');

const userModel = {
  // 경매 목록 조회
  async find() {
    try {
      const sql = `select * from auction`;
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매 등록
  async create(user) {
    try {
      const day = 7 ; // 하드코딩으로 7일 뒤 경매종료 넣음
      const sql = `insert into auction set ?`;
      const [result] = await pool.query(sql,[user]);
      await pool.query(`update auction set auctionEnd =  CURRENT_TIMESTAMP+INTERVAL ? DAY where auctionId = ?`,[day,result.insertId]);
      return result.insertId;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  }
}

module.exports = userModel;