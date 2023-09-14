import React from "react";
import './newIndex.css'

function SignIn() {
  return (
    <div className="wrapper bg-white">
      <div className="h2 text-center">BookStock</div>
      {/* <div className="h4 text-muted text-center pt-2">로그인 정보를 입력하세요</div> */}
      <form className="pt-3">
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input type="text" placeholder="아이디를 입력하세요" required className="" />
          </div>
        </div>
        <div className="form-group py-1 pb-2">
          <div className="input-field">
            <span className="fas fa-lock p-2"></span>
            <input type="text" placeholder="비밀번호를 입력하세요" required className="" />
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
