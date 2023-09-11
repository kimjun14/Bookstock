import React from 'react';

const Register = () => {
    return (
        <div className="container">
            <div className="input-form-backgroud row">
                <div style={{maxWidth: '680px', padding: '32px'}} className="input-form col-md-12 mx-auto">
                    <h4 className="mb-3">회원가입</h4>
                    <form className="validation-form" noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">이름</label>
                                <input type="text" className="form-control" id="name" placeholder="" value="" required />
                                <div className="invalid-feedback">
                                    이름을 입력해주세요.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="nickname">별명</label>
                                <input type="text" className="form-control" id="nickname" placeholder="" value="" required />
                                <div className="invalid-feedback">
                                    별명을 입력해주세요.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">이메일</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                            <div className="invalid-feedback">
                                이메일을 입력해주세요.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">주소</label>
                            <input type="text" className="form-control" id="address" placeholder="서울특별시 강남구" required />
                            <div className="invalid-feedback">
                                주소를 입력해주세요.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">상세주소<span className="text-muted"> (필수 아님)</span></label>
                            <input type="text" className="form-control" id="address2" placeholder="상세주소를 입력해주세요." />
                        </div>


                        <hr className="mt-5 mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="agreement" required />
                            <label className="custom-control-label" htmlFor="agreement">개인정보 수집 및 이용에 동의합니다.</label>
                        </div>
                        <div className="mb-4"></div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">가입 완료</button>
                    </form>
                </div>
            </div>
        </div> 
        );
}

export default Register;