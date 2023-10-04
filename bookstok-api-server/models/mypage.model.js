const pool = require('./pool');

const userModel = {
    async myInfo(userNo){
        try{
            const [result]=await pool.query(
                `SELECT * 
                FROM user
                WHERE userNo=?
                `
            ,userNo)
        }catch(err){
            throw new Error('DB Error', { cause: err });
        }
    }
}

module.exports = userModel;