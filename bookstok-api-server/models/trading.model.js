const pool = require('./pool');

const userModel = {
    // 입력된 주소 확인
    async addrCheck(){
        try {
            const [result] = await pool.query(
                `SELECT addr,addr2,addrpostal
                FROM trading where tradingId = 1`
                );
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 주소 변경
    async addrbuyerChange(dataSet){
        try {
            await pool.query(
            `update trading set ? where tradingId = 1`
            ,dataSet );
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 입력된 송장 확인
    async trackCheck(){
        try {
            const [result] = await pool.query(
                `SELECT trackingNumber,trackingCompany
                FROM trading where tradingId = 1`
                );
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('DB Error');
        }
    },
    // 송장 변경
    async trackSellerChange(dataSet){
        try {
            await pool.query(
            `update trading set ? where tradingId = 1`
            ,dataSet);
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