const pool = require('./pool');
const crypto = require('crypto');

const lostPwdModel = {
  //사용자 확인
  async getUserByEmail(userId) {
    try {
      const sql = `SELECT * FROM user WHERE userId = ?`;
      const [result] = await pool.query(sql, [userId]);

      if (result.length > 0) {
        return result[0];
      } else {
        console.log(sql, userId, result);
        return null;
      }
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },
  //암호 변경
  async changepwd(userId, pwd) {
    try {

      const hashPwd = crypto.createHash('sha1').update(pwd).digest('base64');
      const sql = `UPDATE user SET pwd=? WHERE userId = ?`;
      const [result] = await pool.query(sql, [hashPwd, userId]);
      console.log(result);
      return result.affectedRows;
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },
};

module.exports = lostPwdModel;
