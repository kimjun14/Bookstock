const pool = require('./pool');

const myInfoModel = {
    async updateUserInfo(userNo, nick, pwd, userPhone, userAddr, userAddrSub) {
      try {
          await pool.query(
              `UPDATE user
              SET nick=?, pwd=?, userPhone=?, userAddr=?, userAddrSub=?
              WHERE userNo=?;`,
              [nick, pwd, userPhone, userAddr, userAddrSub, userNo]
          );
      } catch (err) {
          throw new Error('DB Error', { cause: err });
      }
  }
}