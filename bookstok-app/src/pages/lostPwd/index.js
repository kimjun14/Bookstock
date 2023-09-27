import React, { useRef, useState } from "react";
import './index.css'
import { Link, } from "react-router-dom";
import logo from '../../img/logo2Cut.jpg';
import emailjs from '@emailjs/browser';

const LostPwd = function () {
  const form = useRef();

  // 초기 상태를 빈 문자열로 설정
  const [email, setEmail] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('service_m8s3p04', 'template_0n4pomu', form.current, 'WnKyAvQ7Xbhx7cSc5')
      .then((result) => {
        alert("메일 전송이 완료되었습니다.");
        console.log(result.text);
        form.current.reset();
      },
      (error) => {
        console.log(error.text);
        alert("메일 전송이 실패했습니다.");
      }
    );
  };
  
  return (
    <div className="wrapper bg-white">
      <div className="logo">
        <img src={logo} alt="BookStock" />
      </div>
      <form className="pt-3" ref={form} onSubmit={sendEmail}>
        <div className="form-group py-2">
          <div className="input-field">
            <span className="far fa-user p-2"></span>
            <input
              type="text"
              name="user_email"
              placeholder="이메일을 입력하세요"
              required
              value={email} // 상태 변수로 설정된 email을 사용
              onChange={(e) => setEmail(e.target.value)} // 상태 변수 업데이트
            />
          </div>
        </div>


        <button className="btn btn-block btn-primary text-center my-3" type="submit">
          인증메일 발송
        </button>

        <div className="text-center pt-3 text-muted">
          북스탁 회원이 아닌가요?{" "}
          <span className="signup">
            <Link to="./../signUp">회원가입</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LostPwd;
