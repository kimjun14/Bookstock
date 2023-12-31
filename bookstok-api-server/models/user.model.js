const pool = require('./pool');
const crypto=require('crypto');
// nodejs에서 제공하는 crypto 모듈을 이용하여
// 암호를 해시값으로 변경하여 저장, 확인 관리하도록 함

const userModel = {
  // 회원 목록 조회
  async find(){
    try{
      const sql = `select * from user`;
      const [ result ] = await pool.query(sql);
      return result.affectedRows;
    }catch(err){
      throw new Error('DB Error', { cause: err });
    }
  },
  // 회원 가입
  async create(addUserInfo){
    addUserInfo.category1=addUserInfo.categories[0];
    addUserInfo.category2=addUserInfo.categories[1];
    delete addUserInfo.categories;
    console.log(addUserInfo);
    try{
      // crypto 모듈로 비번을 sha1 단방향 암호화를 한 다음 입력
      addUserInfo.pwd=crypto.createHash('sha1').update(addUserInfo.pwd).digest('base64');
      const sql = `insert into user set ?`;
      const [ result ] = await pool.query(sql, [addUserInfo]);
      return result.affectedRows === 1;
    }catch(err){
      console.log(err);
      const newError = new Error('DB Error');
      newError.cause = err;
      throw newError;
    }
  },
  // 로그인
  async signin(user){
    try{
      //const sha1=crypto.createHash('sha1').update(user.pwd).digest('base64');
      //user.pwd = sha1;
      const sql = `select * from user where userId = ? and pwd = ?`;
      const [ result ] = await pool.query(sql, [user.userId, user.pwd]);
      // 로그인 후 접속 시간 업데이트 쿼리를 넘겨줌
      pool.query(`UPDATE user SET userUpdaAt = CURRENT_TIMESTAMP WHERE userId = ?;`,user.userId);
      // 세션정보리턴
      console.log(result)
      return {
        nick:result[0].nick,
        userNo:result[0].userNo
      };
    }catch(err){
      throw new Error('DB Error', { cause: err });
    }
  },

  // 회원정보 수정
  async update(id, user){
    try{
      const sql = `update user set ? where userNo = ?`;
      const [ result ] = await pool.query(sql, [user, id]);
      return result.affectedRows;
    }catch(err){
      throw new Error('DB Error', { cause: err });
    }
  },
  // 비밀번호 변경
  async changepwd(id, user){
    try{
      const newPwd=crypto.createHash('sha1').update(user.pwd).digest('base64');
      const sql = `update user set pwd=? where userNo = ?`;
      const [ result ] = await pool.query(sql, [newPwd, id]);
      return result.affectedRows;
    }catch(err){
      throw new Error('DB Error', { cause: err });
    }
  }
}

module.exports = userModel;
