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
    }
}

module.exports = userModel;