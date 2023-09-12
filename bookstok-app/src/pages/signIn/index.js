import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from './../../AuthContext';

const SignIn = function () {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { setIsLoggedIn } = useAuth();

  const checkId = function (ch) {
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

  const getLoginId = function (event) {
    let value = event.target.value;

    if (!value) {
      setLoginId(value);
      return;
    }

    let length = value.length;

    // 마지막으로 입력된 문자가 유효한 아이디 문자인지 확인하고 유효하지 않으면 함수를 종료합니다.
    if (!checkId(value[length - 1])) {
      return;
    }

    // 모든 검증을 통과한 경우에만 state를 업데이트합니다.
    setLoginId(value);
  };

  const login = function () {
    console.log({ loginId, loginPassword });

    // 아이디와 비밀번호 필드가 비어있는지 확인하고 비어있으면 알림을 띄웁니다.
    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!loginPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoggedIn(true); // 로그인 상태 업데이트

  };

  return (
    <div id="container">
      <div id="loginBox">

        <div id="loginBoxTitle"><span style={{ "fontSize": "30px", "color": "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox">

          <div className="input-form-box"><span>아이디 </span>
            <input type="text" id="loginId" name="loginId" className="form-control" value={loginId} onChange={(e) => getLoginId(e)} />
          </div>

          <div className="input-form-box"><span>비밀번호 </span>
            <input type="password" id="loginPassword" name="loginPassword" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
          </div>

          <div className="button-login-box" >
            <button type="button" className="btn btn-primary btn-xs" style={{ "width": " 30%" }} onClick={login} >로그인</button>
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
