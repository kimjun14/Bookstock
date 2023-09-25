/* global Kakao */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.css'
import axios from 'axios';
import Address from "./address/Adress";

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
  });

function SignUp() {
    const [signUpData,setSignUpData] = useState({});
    const navigation=useNavigate();

    const KakaoRestApiKey = '861d57b9824340a31ae9c887397ac901'; // Kakao REST API Key
    const KakaoRedirectUri = 'http://localhost:3000/oauth/callback/kakao'; // Kakao Redirect URI

    const NaverClientId = 'YP_J3Qwb0dVPZzak0x8Q'; // Naver Client ID
    const NaverRedirectUri = 'http://localhost:3000/auth/naver/callback'; // Naver Redirect URI

    // OAuth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KakaoRestApiKey}&redirect_uri=${KakaoRedirectUri}&response_type=code`;
    const naverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NaverClientId}&redirect_uri=${NaverRedirectUri}&response_type=code`;

    const handleLoginWithKakao = () => {
        window.location.href = kakaoURL;
    }

    const handleLoginWithNaver = () => {
        window.location.href = naverURL;
    }

    const handleSignUpDataChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
            
        });
        console.log(signUpData);
    }

    const handleSignUpSubmit = async () => {
        try {
            await axiosConnect.post('/users/', signUpData)
            window.alert("회원 등록이 완료되었습니다.");
            navigation('/signin');
        } catch (err) {
            console.error(err);
            window.alert("오류가 발생하였습니다.");
            navigation('/signup');
        }
    }
    //주소 처리
        const [enroll_company, setEnroll_company] = useState({
            address:'',
        });

        const [popup, setPopup] = useState(false);

        const handleInput = (e) => {
            setEnroll_company({
                ...enroll_company,
                [e.target.name]:e.target.value,
            })
        }

        const handleComplete = (data) => {
            setPopup(!popup);
        }
    return (
        <div className="container-fluid px-2 px-md-4 py-5 mx-auto">
            <div className="col-lg-7" style={{ margin: 'auto' }}>
                <div className="card2 card border-0 px-4 px-sm-5 py-5">
                    <small className="text-right mb-3">
                        <Link to="./../signIn/">
                            <u style={{color:'gray', textDecoration:'none'}}>북스탁 계정이 이미 있나요?</u>
                        </Link>
                    </small>
                    <h3 className="mb-1" >회원가입</h3>
                    <div className="row px-3" style={{ marginTop: '1rem' }}>
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">닉네임</h6>
                        </label>
                        <input type="text" name="nick" placeholder="RaLiBooks" style={{ width: '50%' }} 
                        value={signUpData.nick} onChange={handleSignUpDataChange} />
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">이메일 주소(아이디)</h6>
                        </label>
                        <input type="text" name="userId" placeholder="BookStock@email.com"
                        value={signUpData.userId} onChange={handleSignUpDataChange} />
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">비밀번호</h6>
                        </label>
                        <input type="password" name="pwd" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        value={signUpData.pwd} onChange={handleSignUpDataChange} />
                    </div>

                    
                    <div className="row px-3" >
                         <label className="mb-0">
                            <h6 className="mb-0 text-sm">주소</h6>
                        </label>
                        <button className="btn btn-primary" onClick={handleComplete}>우편번호 찾기</button>
                        <input className="user_enroll_text" placeholder="주소"  type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address}/>
                        {popup && <Address company={enroll_company} setcompany={setEnroll_company}></Address>}
                    </div>

                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">전화번호</h6>
                        </label>
                        <input type="text" name="userPhone" placeholder="-(하이픈)을 제외하고 입력하세요" 
                        value={signUpData.userPhone} onChange={handleSignUpDataChange} />
                        
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">계좌번호</h6>
                        </label>
                        <input type="text" name="userAccount" placeholder="-(하이픈)을 제외하고 입력하세요" 
                        value={signUpData.userAccount} onChange={handleSignUpDataChange} />
                    </div>
                    <div className="row px-3 mb-3">
                        <small className="text-muted">
                            북스탁에 가입함으로써 <Link to="/terms" className="text-primary">서비스 약관</Link> 및 <Link to="/privacy" className="text-primary"> 및 개인 정보 보호 정책</Link>에 동의합니다.
                        </small>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <button className="btn btn-blue text-center mb-1 py-2" onClick={handleSignUpSubmit} >계정 만들기</button>
                        </div>
                    </div>
                    <div className="row px-3 mb-4 d-flex align-items-center">
                        <div className="line"></div>
                        <small className="text-muted or text-center">OR</small>
                        <div className="line"></div>
                    </div>

                    <div className="row text-center">
                        <div className="col-sm-6">
                            <p className="social-connect1">
                                <span className="fa fa-google-plus"></span>
                                <button className="btn text-center mb-1 py-2" onClick={handleLoginWithKakao}>카카오 계정으로 로그인하기</button>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <p className="social-connect2">
                                <span className="fa fa-google-plus"></span>
                                <button className="btn text-center mb-1 py-2" onClick={handleLoginWithNaver}>네이버 계정으로 로그인하기</button>
                            </p>
                        </div>
                        {/* <div className="col-sm-6">
                            <p className="social-connect">
                                <span className="fa fa-google-plus"></span>
                                <small className="pl-3 pr-1">구글계정으로 로그인하기</small>
                            </p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignUp;

