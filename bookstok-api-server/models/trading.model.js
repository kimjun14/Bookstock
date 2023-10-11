const pool = require('./pool');

const userModel = {
    // 구매자에게 필요한 정보 전달
    async addrCheck(userId){
        try {
            const [result] = await pool.query(
                `SELECT t.*, a.bookTitle
                FROM trading as t 
                join auction as a
                on a.auctionId = t.aId
                where t.buyerId = ?`
                ,[userId]);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 주소 변경
    async addrbuyerChange(dataSet){
        const { tradingId } = dataSet
        try {
            await pool.query(
            `update trading set ? where tradingId = ?`
            ,[dataSet,tradingId] );
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 입력된 송장 확인
    async trackCheck(userId){
        try {
            const [result] = await pool.query(
                `SELECT t.*, a.bookTitle
                FROM trading as t 
                join auction as a
                on a.auctionId = t.aId
                where t.sellerId = ?`
                ,[userId]);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 송장 변경
    async trackSellerChange(dataSet){
        const { tradingId } = dataSet
        try {
            await pool.query(
            `update trading set ? where tradingId = ?`
            ,[dataSet,tradingId]);
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 입력된 통장 확인
    async accountCheck(){
        try {
            const [result] = await pool.query(
                `SELECT buyerAccount,buyerBank,sellerAccount,sellerBank
                FROM trading where tradingId = 1`
                );
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 통장 변경
    async accountChange(dataSet){
        try {
            await pool.query(
            `update trading set ? where tradingId = 1`
            ,dataSet);
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    }
}

module.exports = userModel;