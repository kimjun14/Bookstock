const pool = require('./pool');

const userModel = {
  // 경매 조회(기본값은 책 제목임)
  async auctionSearch(bookName) {
    try {
      const sql = `SELECT * FROM auction WHERE bookTitle LIKE '%${bookName}%' order by auctionPrice DESC`;
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매번호와 연관된 정보 조회
  async auctionIdSearch(auctionId) {
    try {
      const sql = `select * from auction where auctionId = ?`;
      const [result] = await pool.query(sql,auctionId);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매번호와 연관된 입찰 목록 조회
  async auctionIdBidSearch(auctionId) {
    try {
      const sql = `select * from bid where aId = ? order by bidPrice ASC`;
      const [result] = await pool.query(sql,auctionId);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매 등록
  async addAuction(auctionInfo) {
    console.log(auctionInfo.session.userId)
    try {
      const day = 7 ; // 하드코딩으로 7일 뒤 경매종료 넣음
      auctionInfo.body.uId=58;
      const sql = `insert into auction set ?`;
      const [result] = await pool.query(sql,[auctionInfo.body]);
      await pool.query(`update auction set auctionEnd =  CURRENT_TIMESTAMP+INTERVAL ? DAY where auctionId = ?`,[day,result.insertId]);
      return result.insertId;
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 입찰 등록
  async addBid(Bidinfo,auctionId,userId,nick) {
    try {
      Bidinfo.uId=userId
      Bidinfo.aId=auctionId;
      Bidinfo.nickname=nick;
      const query = `insert into bid set ?`;
      await pool.query(query,[Bidinfo]);
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  }
}

module.exports = userModel;