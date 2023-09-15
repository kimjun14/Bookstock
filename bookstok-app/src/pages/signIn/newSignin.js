import React, { useState } from "react";
import './newIndex.css'
import { useNavigate } from "react-router";
import axios from "axios";

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
    <div className="wrapper bg-white">
      <div className="h2 text-center">BookStock</div>
      {/* <div className="h4 text-muted text-center pt-2">로그인 정보를 입력하세요</div> */}
      <form className="pt-3" onSubmit={handleLogin}>
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input type="text" placeholder="아이디를 입력하세요" required className=""  value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          </div>
        </div>

        <div className="form-group py-1 pb-2">
          <div className="input-field">
            <span className="fas fa-lock p-2"></span>
            <input type="text" placeholder="비밀번호를 입력하세요" required className="" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}  />
            <button className="btn bg-white text-muted">
              <span className="far fa-eye-slash"></span>
            </button>
          </div>
        </div>

        <div className="d-flex align-items-start">
          <div className="remember">
            <label className="option text-muted">
              아이디 기억하기
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="ml-auto">
            <a href="#" id="forgot">
                비밀번호를 잊어버렸나요?
            </a>
          </div>
        </div>

        <button className="btn btn-block text-center my-3">로그인</button>
        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요? <a href="./../signUp">회원가입</a>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
