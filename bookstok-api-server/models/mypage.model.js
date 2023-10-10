const pool = require('./pool');

const userModel = {
    async myInfo(userNo){
        try{
            const [result]=await pool.query(
                `SELECT nick,userId,userPhone,userAddr,userAddrSub,point
                FROM user
                WHERE userNo=?;
                `
            ,userNo)
            return result[0];
        }catch(err){
            throw new Error('DB Error', { cause: err });
        }
    },
    // 마이페이지 기능 테스트용 (분리예정)
    async mypageRecentSearch(data) {
        try {
            const [result] = await pool.query(
                `SELECT * FROM auction 
                WHERE auctionId 
                in (?) 
                order by auctionId DESC`, [data]);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 마이페이지 기능 테스트용 (분리예정)
    async mypageFavoriteSearch(data) {
        try {
            const [result] = await pool.query(
                `SELECT auction.*
                FROM auction
                JOIN 
                    suggestAuc ON auction.auctionId = suggestAuc.aId
                WHERE 
                    suggestAuc.checked = 1 AND suggestAuc.uId = ? and auction.done=0;`, [data]);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },    
    async myAuction(userNo){
        try{
            const [result]=await pool.query(
                `SELECT *
                from auction
                where uId=? and done=0;`
            ,userNo)
            return result;
        }catch(err){
            throw new Error('DB Error', { cause: err });
        }
    },
    async myAuctionBid(userNo){
        try{
            const [result]=await pool.query(
                `SELECT B.*, A.*
                from bid as B
                join auction as A
                on B.aId = A.auctionId
                where B.uId=? and B.done=0 and A.done=0
                order by aId ASC, bidId ASC;`
            ,userNo)
            return result;
        }catch(err){
            throw new Error('DB Error', { cause: err });
        }
    },
    async mainpageRankingSet(){
        try{

        }catch(err){

        }
    }
}

module.exports = userModel;