import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './index.css'
import axios from 'axios';
import Address from "./address/Adress";

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    withCredentials: true
});

const MyInfo = () => {
  const [signUpData, setSignUpData] = useState({});
  const [isPasswordMatch, setPasswordMatch] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택한 카테고리 배열 추가
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigate();

  const handleSignUpDataChange = (e) => {
      setSignUpData({
          ...signUpData,
          [e.target.name]: e.target.value

      });
      console.log(signUpData);
  }

  const handleConfirmPasswordChange = (e) => {
      const confirmPasswordValue = e.target.value;
      setConfirmPassword(confirmPasswordValue);

      // 비밀번호 확인
      if (signUpData.pwd !== confirmPasswordValue) {
          setPasswordMatch(false);
      } else {
          setPasswordMatch(true);
      }
  };

  const handleSignUpSubmit = async () => {
      try {
          // 필수 입력 필드 검사
          if (!signUpData.nick || !signUpData.userId || !signUpData.pwd || !signUpData.userPhone || signUpData.Address || !confirmPassword) {
              window.alert("모든 필수 정보를 입력하세요.");
              return;
          }

          // 비밀번호 확인
          if (signUpData.pwd !== confirmPassword) {
              setPasswordMatch(false);
              console.log("Password doesn't match");
              return;
          } else {
              setPasswordMatch(true); // 비밀번호가 일치하면 초기화
          }

          // 카테고리 선택 검사
          if (selectedCategories.length < 1) {
              window.alert("적어도 1개 이상의 카테고리를 선택하세요.");
              return;
          }

          // 회원 가입 데이터에 선택된 카테고리 추가
          signUpData.categories = selectedCategories;
          signUpData.userAddr = enroll_company.address;
          signUpData.userAddrSub = detailAddress;
          console.log(signUpData);

          // 서버로 데이터 전송
          await axiosConnect.post('/users/', signUpData);

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
      address: '',
  });


  const handleInput = (e) => {
      setEnroll_company({
          ...enroll_company,
          [e.target.name]: e.target.value,
      })
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  const [detailAddress, setDetailAddress] = useState('');

  const handleDetailAddressChange = (e) => {
      setDetailAddress(e.target.value);
  };

  useEffect(() => {
      console.log(enroll_company);
      console.log(selectedCategories);
  }, [selectedCategories]) // 상태변화 체크용

  return (
      <>
      <div className="container-fluid px-2 px-md-4 py-5 mx-auto">
          <div className="col-lg-12" style={{ margin: 'auto' }}>
              <div className="card2 card border-0 px-4 px-sm-5 py-5">
                  <h3 className="mb-1" >회원정보 수정</h3>
                  <div className="row px-3" style={{ marginTop: '1rem' }}>
                      <label className="mb-0">
                          <h6 className="mb-0 text-sm">닉네임</h6>
                      </label>
                      <input type="text" name="nick" placeholder="RaLiBooks" style={{ width: '50%' }}
                          value={signUpData.nick} onChange={handleSignUpDataChange} />
                  </div>
                  <div className="row px-3">
                      <label className="mb-0">
                          <h6 className="mb-0 text-sm">비밀번호</h6>
                      </label>
                      <input type="password" name="pwd" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          value={signUpData.pwd} onChange={handleSignUpDataChange} />
                  </div>
                  <div className="row px-3" style={{ marginBottom: confirmPassword ? '25px' : '2px' }}>
                      <label className="mb-0">
                          <h6 className="mb-0 text-sm">비밀번호 확인</h6>
                      </label>
                      <input
                          className="SignUpinput"
                          type="password"
                          name="pwd"
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                          style={{ margin: confirmPassword && '0' }}
                      />
                      {confirmPassword && (
                          <p style={{ color: isPasswordMatch ? 'green' : 'red', margin: '0' }}>
                              {isPasswordMatch ? '✅ 비밀번호가 일치합니다' : '❌ 비밀번호가 일치하지 않습니다'}
                          </p>
                      )}
                  </div>


                  <div className="row px-3" >
                      <label className="mb-0">
                          <h6 className="mb-0 text-sm">주소</h6>
                      </label>
                      <div className="row">
                          <input className="col-sm-12 user_enroll_text SignUpinput" placeholder="주소" type="text" required={true} name="address" onChange={handleInput} value={enroll_company.address} />
                      </div>
                      <input className="SignUpinput" type="text" id="detailAddress" name="detailAddress" placeholder="상세주소" value={detailAddress} onChange={handleDetailAddressChange} />
                      <div className="col-sm-4">
                          <button className="addressBtn btn btn-primary mt-1" onClick={handleOpenModal}>우편번호 찾기</button>
                      </div>
                      {isModalOpen && <Address company={enroll_company} setcompany={setEnroll_company} closeModal={handleCloseModal}></Address>}
                  </div>

                  <div className="row px-3">
                      <label className="mb-0">
                          <h6 className="mb-0 text-sm">전화번호</h6>
                      </label>
                      <input className="SignUpinput" type="text" name="userPhone" placeholder="-(하이픈)을 제외하고 입력하세요"
                          value={signUpData.userPhone} onChange={handleSignUpDataChange} />
                  </div>
                  <div className="row mb-4">
                      <div className="col" style={{ border: '0', width: '55%', marginTop: '1rem' }}>
                          <button className="btn btn-blue-signup text-center mb-1 py-2" onClick={handleSignUpSubmit} >회원정보 수정 </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </>
  );
}

export default MyInfo;
