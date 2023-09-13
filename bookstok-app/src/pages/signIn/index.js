import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = function () {
  const [loginId, setLoginId] = useState(""); // 입력받은 아이디
  const [loginPassword, setLoginPassword] = useState(""); // 입력받은 패스워드
  const [button, setButton] = useState(false); // 버튼 활성화 여부
  const Navigate = useNavigate();

  const goToMain = () => {
    Navigate('/');
    console.log('로그인 성공 메인 페이지로 이동');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ loginId, loginPassword });

    // 아이디와 비밀번호 필드가 비어있는지 확인하고 비어있으면 알림.
    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!loginPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      // axios를 사용하여 서버에 POST 요청을 보냅니다.
      const response = await axios.post('http://localhost:12345/api/users/signin', {
        userId: loginId,
        pwd: loginPassword,
      });

      // 서버에서의 응답을 확인합니다.
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.message === 'SUCCESS') {
          setButton(true);
          goToMain();
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      } else {
        // 서버 오류 처리
        alert('서버 오류로 로그인에 실패하였습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생하였습니다.');
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
            <button type="submit" className="loginButton"	disabled={button}  style={{ "width": " 30%" }} >로그인</button>
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
