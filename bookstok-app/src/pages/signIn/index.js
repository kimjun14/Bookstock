import React from "react";

const SignIn = function () {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center">
              <h2 className="text-primary">bookstock Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="uid" className="form-label">
                    아이디
                  </label>
                  <input type="text" name="uid" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="upw" className="form-label">
                    비밀번호
                  </label>
                  <input type="password" name="upw" className="form-control" />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" style={{ width: "30%" }}>
                    로그인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
