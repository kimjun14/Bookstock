import React, { useState } from "react";
import './index.css'
import { Link, } from "react-router-dom";
import logo from '../../img/logo2Cut.jpg';
import axios from "axios";


const LostPwd = function () {
  const [email, setEmail] = useState()
  const sendEmail = () => {
    if(email){
    alert('메일 전송이 완료돼었습니다.')
    }else{
      alert('메일 주소를 입력해 주세요')
    }
  }
  return (
    <div className="wrapper bg-white">
      <div className="logo">
        <img src={logo} alt="BookStock" />
      </div>
      <form className="pt-3" >
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              name="username"
              placeholder="이메일을 입력하세요"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
        </div>


        <button className="btn btn-block btn-primary text-center my-3" onClick={sendEmail}>
          인증메일 발송
        </button>

        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요?{" "}
          <span className="signup">
            <Link to="./../signUp">회원가입</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LostPwd;
