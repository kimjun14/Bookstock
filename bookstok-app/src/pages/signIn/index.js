import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignIn = function () {
  const realId = "test@naver.com";  //DB아이디
  const realPassword = "123456789"; //DB패스워드
  const [loginId, setLoginId] = useState(""); //입력받은 아이디
  const [loginPassword, setLoginPassword] = useState(""); //입력받은 패스워드
  //const [isLogIn, setIsLogIn] = useState(false); //로그인 상태 
  const [button, setButton] = useState(false); //버튼 활성화 여부
  const Navigate = useNavigate();

  const goToMain = () => {
    Navigate('/')
    console.log('로그인 성공 메인 페이지로 이동')
  };


  const handleLogin = (e) => {
    e.preventDefault();
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

    if (realId == loginId && realPassword == loginPassword) {
      setButton(true); // 버튼 비활성화
      goToMain();
    } else {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div id="container">
      <div id="loginBox">

        <div id="loginBoxTitle"><span style={{ "fontSize": "30px", "color": "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox">
          <form onSubmit={handleLogin}>
          <div className="input-form-box"><span>아이디 </span>
            {/* <input type="text" id="loginId" name="loginId" className="form-control" value={loginId} onChange={(e) => getLoginId(e)} /> */}
            <input type="text" id="loginId" name="loginId" className="form-control" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          </div>

          <div className="input-form-box"><span>비밀번호 </span>
            <input type="password" id="loginPassword" name="loginPassword" className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}  />
          </div>

          <div className="button-login-box" >
            <button type="submit" className="loginButton"	disabled={button}  style={{ "width": " 30%" }} onClick={handleLogin}>로그인</button>
          </div>
          </form>

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
