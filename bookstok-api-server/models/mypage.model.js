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
    }
}

module.exports = userModel;