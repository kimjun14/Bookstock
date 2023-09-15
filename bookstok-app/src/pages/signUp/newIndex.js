import React from "react";
import { Link } from "react-router-dom";
import './newIndex.css'

function SignUp() {
    return (
        <div className="container-fluid px-2 px-md-4 py-5 mx-auto">
            <div className="col-lg-7" style={{margin:'auto'}}>
                <div className="card2 card border-0 px-4 px-sm-5 py-5">
                    <small className="text-right mb-3">
                        <Link to="./../signIn/newSignin.js">
                            <u>북스탁 계정이 이미 있나요?</u>
                        </Link>
                    </small>
                    <h3 className="mb-1">회원가입</h3>
                    {/* <p className="mb-4 text-sm">Create your account and start learning with thousands of courses</p> */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="mb-0">
                                <h6 className="mb-0 text-sm">닉네임</h6>
                            </label>
                            <input type="text" name="fname" placeholder="RaLiBooks" />
                        </div>
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">이메일 주소(아이디)</h6>
                        </label>
                        <input type="text" name="email" placeholder="BookStock@email.com" />
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">비밀번호</h6>
                        </label>
                        <input type="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">주소</h6>
                        </label>
                        <input type="text" name="email" placeholder="주소를 입력하세요" />
                    </div>
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">계좌번호</h6>
                        </label>
                        <input type="text" name="email" placeholder="-(하이픈)을 제외하고 입력하세요" />
                    </div>
                    <div className="row px-3 mb-3">
                        <small className="text-muted">
                            북스탁에 가입함으로써 <Link to="/terms" className="text-primary">서비스 약관</Link> 및 <Link to="/privacy" className="text-primary"> 및 개인 정보 보호 정책</Link>에 동의합니다.
                        </small>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <button className="btn btn-blue text-center mb-1 py-2" >계정 만들기</button>
                        </div>
                    </div>
                    <div className="row px-3 mb-4">
                        <div className="line"></div>
                        <small className="text-muted or text-center">OR</small>
                        <div className="line"></div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-6">
                            <p className="social-connect1">
                            <button className="btn btn-blue text-center mb-1 py-2">카카오 계정으로 로그인하기</button>
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <p className="social-connect2">
                                <span className="fa fa-google-plus"></span>
                                <button className="btn btn-blue text-center mb-1 py-2">네이버 계정으로 로그인하기</button>
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
