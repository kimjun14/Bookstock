import React, { useEffect, useState } from "react";
import './index.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from '../../AuthContext';
import logo from '../../img/logo2Cut.jpg'

// 이 함수들을 컴포넌트 외부에서 정의하고 내보냅니다.
export const handleLoginWithKakao2 = () => {
  const KakaoRestApiKey2 = '861d57b9824340a31ae9c887397ac901'; // Kakao REST API Key
  const KakaoRedirectUri2 = 'http://localhost:3000/oauth/callback/kakao'; // Kakao Redirect URI
  const kakaoURL2 = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApiKey2}&redirect_uri=${KakaoRedirectUri2}&response_type=code`;
  window.location.href = kakaoURL2;
}

export const handleLoginWithNaver2 = () => {
  const NaverClientId2 = 'YP_J3Qwb0dVPZzak0x8Q'; // Naver Client ID
  const NaverRedirectUri2 = 'http://localhost:3000/auth/naver/callback'; // Naver Redirect URI
  const naverURL2 = `https://nid.naver.com/oauth2.0/authorize?client_id=${NaverClientId2}&redirect_uri=${NaverRedirectUri2}&response_type=code`;
  window.location.href = naverURL2;
}

const SignIn = function () {
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth를 통해 login 함수 가져오기

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
    //아이지 저장에 체크돼 있을 경우
    if (true /* 로그인 성공 했을 때 */) {
      if(saveId) {
        localStorage.setItem(LS_KEY_ID, loginId);
      }
    };

    try {
      const response = await axios.post('http://220.127.80.225:12345/api/users/signin', {
        userId: loginId,
        pwd: loginPassword
      });

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.message === 'SUCCESS') {
          // 서버로부터 'SUCCESS' 메시지를 받으면 로그인 성공 처리를 수행합니다.
          localStorage.setItem('token', responseData.token); // 받은 토큰 저장
          login(); // 로그인 상태 업데이트
          navigate('/'); // 메인 페이지로 이동
          console.log('로그인 성공 메인 페이지로 이동');
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
      navigate('/'); // 오류 발생 시 메인 페이지로 이동
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
    if (idFlag ===false) {
      localStorage.setItem(LS_KEY_ID, "");
    } 
    let data = localStorage.getItem(LS_KEY_ID);
    if (data !== null) {
      setLoginId(data);
    }
  },[])


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
              <input type="checkbox" name="checkbox" checked={saveId} onChange={handleSaveId}/>
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="ml-auto">
            <a href="#" id="forgot">
              비밀번호를 잊어버렸나요?
            </a>
          </div>
        </div>
        <button className="btn btn-block btn-primary text-center my-3">
          로그인
        </button>
        <div className="socialLogin">
          <div className="col-sm-6">
            <p className="social-connect1">
              <span className="fa fa-kakao-plus"></span>
              <button className="btn text-center mb-1 py-2" onClick={handleLoginWithKakao2}>카카오 계정으로 로그인하기</button>
            </p>
          </div>
          <div className="col-sm-6">
            <p className="social-connect2">
              <span className="fa fa-naver-plus"></span>
              <button className="btn text-center mb-1 py-2" onClick={handleLoginWithNaver2}>네이버 계정으로 로그인하기</button>
            </p>
          </div>
        </div>
        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요? <span className="signup"><a vhref="./../signUp">회원가입</a></span>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
