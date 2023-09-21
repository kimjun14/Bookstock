import React, { useEffect, useState } from "react";
import './index.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../AuthContext';
import logo from '../../img/logo2Cut.jpg'

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함

const LostPwd = function () {
  
  return (
    
    <div className="wrapper bg-white">
      <div className="logo">
        <img src={logo} alt="BookStock" />
      </div>
      <form className="pt-3">
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              required
              className=""
            />
          </div>
        </div>

        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              placeholder="변경할 비밀번호를 입력하세요"
              required
              className=""
            />
          </div>
        </div>

        <div className="form-group py-1 pb-2">
          <div className="input-field">
            <span className="fas fa-lock p-2"></span>
            <input
              type="password"
              placeholder="비밀번호를 다시 한 번 입력하세요"
              required
              className=""
            />            

            <button className="btn bg-white text-muted">
              <span className="far fa-eye-slash"></span>
            </button>
          </div>
        </div>

        
        <button className="btn btn-block btn-primary text-center my-3">
          비밀번호 변경
        </button>

        
        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요? <span className="signup"><Link to="./../signUp">회원가입</Link></span>
        </div>
      </form>
    </div>
  );
}

export default LostPwd;
