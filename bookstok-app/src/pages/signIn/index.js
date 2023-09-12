import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = function () {

  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const chechId = function (ch) {
    let ascii = ch.charCodeAt(0);
    if (33 /* ! */ <= ascii && ascii <= 47 /* / */) return true;
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (58 /* : */ <= ascii && ascii <= 64 /* @ */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (91 /* [ */ <= ascii && ascii <= 96 /* ` */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (123 /* { */ <= ascii && ascii <= 126 /* ~ */) return true;

    return false;
  };

  const getLoginId = (event) => {
    let value = event.target.value;
  
    if (value === "") {
      setLoginId(value);
      return;
    }
  
    let length = value.length;
    if (chechId(value[length - 1]) === false) return;
    
    setLoginId(value);
    
    return;
  };

  const login = function () {
    console.log({ loginId, loginPassword });

    if (loginId === "") {
      alert("아이디를 입력해주세요.");
    }
    if (loginPassword === "") {
      alert("비밀번호를 입력해주세요.");
    } 
  };

    return(
    <div id="container">
      <div id="loginBox">
      
        <div id="loginBoxTitle"><span style={{ "fontSize" : "30px", "color" : "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox">

          <div className="input-form-box"><span>아이디 </span>
            <input type="text" id="loginId" name="loginId" className="form-control" value={loginId} onChange={(e) => getLoginId(e)}/>
          </div>

          <div className="input-form-box"><span>비밀번호 </span>
            <input type="password" id="loginPassword" name="loginPassword" className="form-control" value = {loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
          </div>
         
          <div className="button-login-box" >
            <button type="button" className="btn btn-primary btn-xs" style={{"width" :" 30%"}} onClick={login} >로그인</button>
          </div>

          <div>
            <Link to="/signUp">
              <span className="bold">회원가입</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
