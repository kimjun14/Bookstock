const pool = require('./pool');

const userModel = {
  // 경매 목록 조회
  async auctionSearch(auctionId) {
    try {
      const sql = `select * from auction where auctionId = ?`;
      const [result] = await pool.query(sql,auctionId);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매 등록
  async addAuction(auctionInfo) {
    try {
      const day = 7 ; // 하드코딩으로 7일 뒤 경매종료 넣음
      const sql = `insert into auction set ?`;
      const [result] = await pool.query(sql,[auctionInfo]);
      await pool.query(`update auction set auctionEnd =  CURRENT_TIMESTAMP+INTERVAL ? DAY where auctionId = ?`,[day,result.insertId]);
      return result.insertId;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 입찰 등록
  async addBid(Bidinfo,auctionId) {
    try {
      const userId=58;
      Bidinfo.aId=auctionId;
      Bidinfo.uId=userId;
      const query1 = `insert into bid set ?`;
      const [result] = await pool.query(query1,[Bidinfo]);
      return result.insertId;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  }
}

module.exports = userModel;