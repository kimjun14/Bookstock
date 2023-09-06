

const SignIn = function () {
    return(
    <div id="container">
      <div id="loginBox">
      
        <div id="loginBoxTitle"><span style={{ "fontSize" : "30px", "color" : "$teal-500" }}>bookstock Login</span></div>
        <div id="inputBox">
          <div className="input-form-box"><span>아이디 </span><input type="text" name="uid" className="form-control"/></div>
          <div className="input-form-box"><span>비밀번호 </span><input type="password" name="upw" className="form-control"/></div>
          <div className="button-login-box" >
            <button type="button" className="btn btn-primary btn-xs" style={{"width" :" 30%"}}>로그인</button>
          </div>
        </div>
        
      </div>
    </div>
    );
};

export default SignIn;