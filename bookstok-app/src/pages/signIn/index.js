import React, { useState } from "react";

const SignIn = function () {

  const [loginId, setLoginId] = useState("");

  const chechId = function (ch) {
    let ascii = ch.charCodeAt(0);
    if (48 /* 0 */ <= ascii && ascii <= 57 /* 9 */) return true;
    if (65 /* A */ <= ascii && ascii <= 90 /* Z */) return true;
    if (97 /* a */ <= ascii && ascii <= 122 /* z */) return true;
    if (ch === ".") return true;

    return false;
  };

  const getLoginId = function (event) {
    
    let value = event.target.value;
  
    if (value === "") {
      setLoginId(value);
      return;
    }
  
    let length = value.length;
    if (chechId(value[length - 1]) === false) return;
    
    setLoginId(value);
    
    return;
  };

    return(
    <div id="container">
      <div id="loginBox">
      
        <div id="loginBoxTitle"><span style={{ "fontSize" : "30px", "color" : "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox">
          <div className="input-form-box"><span>아이디 </span>
            <input type="text" name="uid" className="form-control" value={loginId} onChange={(e) => getLoginId(e)}/></div>

          <div className="input-form-box"><span>비밀번호 </span>
            <input type="password" name="upw" className="form-control"/></div>
          <div className="button-login-box" >
            <button type="button" className="btn btn-primary btn-xs" style={{"width" :" 30%"}}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
