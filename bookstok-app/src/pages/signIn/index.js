import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'

const SignIn = function () {
  const [loginId, setLoginId] = useState(""); // 입력받은 아이디
  const [loginPassword, setLoginPassword] = useState(""); // 입력받은 패스워드
  const [button, setButton] = useState(false); // 버튼 활성화 여부
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Navigate = useNavigate();

  const handleLogin = async function (e) {
    e.preventDefault();

    if (!loginId) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!loginPassword) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:12345/api/users/signin', {
        userId: loginId,
        pwd: loginPassword
      });

      const goToMain = () => {
        Navigate('/');
        console.log(response);
        console.log('로그인 성공 메인 페이지로 이동');
      };

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.message === 'SUCCESS') {
          // 서버로부터 'SUCCESS' 메시지를 받으면 로그인 성공 처리를 수행합니다.
          setIsLoggedIn(true);
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
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>LOGIN</h1>
      <p style={{ marginLeft: '21%' }}>다양한 서비스를 이용하시려면 회원 로그인이 필요합니다.</p>
      <div className="login-container">
        <div className="form-group">
          {/* <div id="loginBoxTitle"><span style={{ "fontSize": "30px", "color": "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox"> */}
          <div className="leftLogin">
            <div className="idpwdSubmit">
              
              <form className='idpwdInput' onSubmit={handleLogin}>
                <div className="input-form-box">
                  <input type="text" id="loginId" name="loginId" placeholder='아이디를 입력하세요' className="form-control" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
                </div>

                <div className="input-form-box">
                  <input type="password" id="loginPassword" name="loginPassword" placeholder='비밀번호를 입력하세요' className="form-control" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                </div>
              </form>

              <div className="loginBtn">
                <button type="submit">로그인<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg></button>
              </div>

            </div>
            <div className="checkSearch">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">ID저장하기</label>
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">자동로그인</label>
              <div className="idpwdSearch">
                <button>아이디 찾기</button> | 
                <button>비밀번호 찾기</button>
              </div>
            </div>
            <p>
              아직 회원이 아니세요? <a href="./../signUp" style={{color:'#1187cf'}}>회원가입</a>
            </p>
          </div>
        </div>
        <div className="sns-login">
          <p style={{textAlign:'center'}}>SNS으로 간편로그인</p>
          <button style={{marginBottom:'0.5rem'}}><img src="https://cheolsusee.com/img/es_img/btn_kakao_login2.png"></img></button>
          <br></br><button><img src="https://cheolsusee.com/img/es_img/btn_naver_login2.png"></img></button>
        </div>
      </div>
    </>
  );

};

export default SignIn;
