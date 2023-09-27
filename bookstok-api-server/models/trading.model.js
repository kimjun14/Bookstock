const pool = require('./pool');

const userModel = {
    // 주소 확인
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

    }
}

module.exports = userModel;