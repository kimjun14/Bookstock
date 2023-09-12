import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [data, setData] = useState({
        userId: '',
        pwd: '',
        nick: '',
        userPhone: '',
        userAccount: '',
        userAddr: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://220.127.80.225:12345/api/users', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };
    return (
        <div className="container">
            <div className="input-form-background row">
                <div style={{ maxWidth: '100%', padding: '16px' }} className="input-form col-md-12 mx-auto">
                    <h4 className="mb-3">회원가입</h4>
                    <form className="validation-form" noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">닉네임</label>
                                <input type="text" className="form-control" id="nick" placeholder="닉네임을 입력해주세요." name="nick" value={data.nick} onChange={handleChange} required />
                                <div className="invalid-feedback">
                                    닉네임을 입력해주세요.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email">이메일</label>
                                <input type="email" className="form-control" id="email" placeholder="you@example.com" name="userId" value={data.userId} onChange={handleChange} required />
                                <div className="invalid-feedback">
                                    이메일을 입력해주세요.
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="address">주소</label>
                                <input type="text" className="form-control" id="address" placeholder="서울특별시 강남구" name="userAddr" value={data.userAddr} onChange={handleChange} required />
                                <div className="invalid-feedback">
                                    주소를 입력해주세요.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="userPhone">전화번호</label>
                                <input type="text" className="form-control" id="userPhone" placeholder="-빼고 입력해주세요" name="userPhone" value={data.userPhone} onChange={handleChange} required />
                                <div className="invalid-feedback">
                                    전화번호를 입력해주세요.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">상세주소<span className="text-muted"> (필수 아님)</span></label>
                            <input type="text" className="form-control" id="address2" placeholder="상세주소를 입력해주세요." />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="userAccount">계좌번호</label>
                            <input type="text" className="form-control" id="userAccount" placeholder="계좌번호를 입력해주세요." name="userAccount" value={data.userAccount} onChange={handleChange} required />
                            <div className="invalid-feedback">
                                계좌번호를 입력해주세요.
                            </div>
                        </div>

                        <hr className="my-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="agreement" required />
                            <label className="custom-control-label" htmlFor="agreement">개인정보 수집 및 이용에 동의합니다.</label>
                        </div>
                        <div className="my-4"></div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleSubmit}>가입 완료</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;