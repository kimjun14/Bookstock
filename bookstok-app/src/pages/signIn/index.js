import React, { useEffect, useState } from "react";
import './index.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../AuthContext';
import logo from '../../img/logo2Cut.jpg'

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true
});

const SignIn = function () {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // useAuth를 통해 login 함수와 isLoggedIn 상태 가져오기

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async function (e) {

    try {
      const response = await axiosConnect.post('/users/signin', {
        userId: loginId,
        pwd: loginPassword
      });

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.message === 'SUCCESS') {
          console.log("로그인 성공");
          sessionStorage.setItem('token', responseData.token);
          login();
          navigate('/');
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      } else {
        alert('서버 오류로 로그인에 실패하였습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생하였습니다.');
      navigate('/');
    }
  };


  //아이디 저장
  const LS_KEY_ID = 'LS_KEY_ID';
  const LS_KEY_SAVE_ID_FLAG = 'LS_KEY_SAVE_ID_FLAG';

  const [saveId, setSaveId] = useState(false);


  const handleSaveId = function () {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, !saveId);
    setSaveId(!saveId);
  };

  useEffect(() => {
    let idFlag = JSON.parse(localStorage.getItem(LS_KEY_SAVE_ID_FLAG));
    if (idFlag !== null) {
      setSaveId(idFlag);
    }
    if (idFlag === false) {
      localStorage.setItem(LS_KEY_ID, "");
    }
    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) {
      setLoginId(data);
    }
  }, [])


  return (
    <div className="wrapper bg-white">
      <div className="logo">
        <img src={logo} alt="BookStock" />
      </div>
      <form className="pt-3" onSubmit={handleLogin}>
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              required
              className=""
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group py-1 pb-2">
          <div className="input-field">
            <span className="fas fa-lock p-2"></span>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              className=""
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="btn bg-white text-muted">
              <span className="far fa-eye-slash"></span>
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="remember">
            <label className="option text-muted">
              아이디 기억하기
              <input type="checkbox" name="checkbox" checked={saveId} onChange={handleSaveId} />
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="ml-auto">
            <Link to="/lostPwd" id="forgot">
              비밀번호를 잊어버렸나요?
            </Link>
          </div>
        </div>
        <button className="btn btn-block btn-primary text-center my-3" style={{ width: '100%', fontWeight: '600', fontSize: 'large', height: '3rem', margin: 'auto' }}>
          로그인
        </button>

        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요? <span className="signup"><Link to="./../signUp">회원가입</Link></span>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
