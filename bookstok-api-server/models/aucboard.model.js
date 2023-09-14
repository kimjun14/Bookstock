const pool = require('./pool');
// nodejs에서 제공하는 crypto 모듈을 이용하여
// 암호를 해시값으로 변경하여 저장, 확인 관리하도록 함

const userModel = {
  // 경매 목록 조회
  async find() {
    try {
      const sql = `select * from auction`;
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  },
  // 경매 등록
  async create(user) {
    try {
      const sql = `insert into auction set ?`;
      const [result] = await pool.query(sql, [user]);
      return result.insertId;
    } catch (err) {
      throw new Error('DB Error', { cause: err });
    }
  }
}

module.exports = userModel;