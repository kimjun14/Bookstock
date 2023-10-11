const pool = require('./pool');

const userModel = {
  // 경매 조회(기본값은 책 제목임)
  async auctionSearch(bookName,mode) {
    var category;
    if(!mode){category="auctionId"}
    else if(mode==1){category="bookTitle"}
    else if(mode==2){category="viewCount"}
    try {
      const sql = `SELECT * FROM auction WHERE bookTitle LIKE '%${bookName}%' and done = false order by ${category} DESC limit 10`;
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
        `select 
          A.auctionId as aId,
          A.uId as buyerId,
          B.uId as sellerId,
          B.bidPrice as price
        from auction as A
        inner join bid as B
        on A.auctionId = B.aId
        WHERE A.auctionId = ? and B.bidId = ?;`
      ,[auctionId,bidId]);
      await pool.query(   // 알아낸 구매자와 판매자 유저번호를 trading tbl에 등록 = 거래 시작
        `insert into trading set ?`,
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
  },
  // 추천 등록
  async addAuctionStar(auctionId,userId) {
    try {
      const queryParams = { "aId": auctionId, "uId": userId };
      const query = `SELECT * FROM suggestAuc WHERE aId = ? AND uId = ?`;
      const [checked] = await pool.query(query,[queryParams.aId, queryParams.uId]);
      if(checked.length===0){
        await pool.query(`insert into suggestAuc (aId,uId,checked) values (?,?,?)`,[queryParams.aId, queryParams.uId,1])
      }else{
        await pool.query(
          `update suggestAuc 
          set checked=CASE
            WHEN checked=1 THEN 0
            WHEN checked=0 THEN 1
            ELSE checked
          END
          where aId=? and uId=? `,[queryParams.aId, queryParams.uId])
      }
    } catch (err) {
      console.error(err);
      throw new Error('DB Error');
    } finally{
      await pool.query(
        `UPDATE auction a
        LEFT JOIN (
            SELECT aId, COUNT(*) as checked_count
            FROM suggestAuc
            WHERE checked =1
            GROUP BY aId
        ) AS subquery ON a.auctionId = subquery.aId
        SET a.star = IFNULL(subquery.checked_count, 0);`);
    }
  }
}

module.exports = userModel;