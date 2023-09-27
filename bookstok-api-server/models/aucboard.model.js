const pool = require('./pool');

const userModel = {
  // 경매 조회(기본값은 책 제목임)
  async auctionSearch(bookName) {
    try {
      const sql = `SELECT * FROM auction WHERE bookTitle LIKE '%${bookName}%' and done = false order by auctionId DESC limit 10`;
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
      await pool.query(`UPDATE auction SET viewCount = viewCount + 1 WHERE auctionId = ?`,auctionId)
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
  // 경매 낙찰이 돼서 완료시킴
  async auctionIdDone(auctionId,bidId) {
    try {
      await pool.query(
        `update auction set done = true where auctionId = ?`
        ,auctionId);
      await pool.query(
        `update bid set done = true where bidId = ?`
        ,bidId);
      const [ result ] = await pool.query(  // 구매자와 판매자 유저번호 확인
        `select A.uId as buyerId,
        B.uId as sellerId
        from auction as A
        inner join bid as B
        on A.auctionId = B.aId
        WHERE A.auctionId = ?;`
      ,auctionId);
      await pool.query(   // 알아낸 구매자와 판매자 유저번호를 trading tbl에 등록 = 거래 시작
        `insert into Trading set ?`,
        result[0]);
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    }
  },
  // 경매 등록
  async addAuction(auctionInfo,userId,nick) {
    try {
      const day=auctionInfo.auctionEnd;
      delete auctionInfo.auctionEnd;
      auctionInfo.uId = userId;
      auctionInfo.nickname = nick;
      const sql = `insert into auction set ?`;
      const [result] = await pool.query(sql,[auctionInfo]);
      await pool.query(`update auction set auctionEnd =  CURRENT_TIMESTAMP+INTERVAL ? DAY where auctionId = ?`,
      [day,result.insertId]);
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