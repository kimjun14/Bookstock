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


const categories = [
    {
        name: '소설',
        no: 1,
        subcategories: [
            '소설 전체',
            '한국소설',
            '영미소설',
            '일본 소설',
            '중국 소설',
            '북유럽 소설',
            '독일 소설',
            '프랑스 소설',
            '기타 국가 소설',
            '추리/미스터리/스릴러',
            'SF 소설',
            '국내 판타지 소설',
            '해외 판타지 소설',
            '국내 역사소설',
            '해외 역사소설',
            '대체 역사소설',
            '동양 고전문학',
            '서양 고전문학'
        ],
    },
    {
        name: '경영/경제',
        no: 2,
        subcategories: [
            '경영/경제 전체',
            '경영일반',
            '경제일반',
            '마케팅/세일즈',
            '재테크/금융/부동산',
            'CEO/리더십'
        ],
    },
    {
        name: '인문/사회/역사',
        no: 3,
        subcategories: [
            '인문/사회/역사 전체',
            '인문',
            '정치/사회',
            '예술/문화',
            '역사'
        ],
    },
    {
        name: "자기계발",
        no: 4,
        subcategories: [
            '자기계발 전체',
            '성공/삶의자세',
            '기획/창의/리더십',
            '설득/화술/협상',
            '취업/창업',
            '여성',
            '인간관계'
        ]
    },
    {
        name: "에세이/시",
        no: 5,
        subcategories: [
            '에세이/시 전체',
            '에세이',
            '시'
        ]
    },
    {
        name: "여행",
        no: 6,
        subcategories: [
            '여행 전체',
            '국내여행',
            '해외여행'
        ]
    },
    {
        name: "종교",
        no: 7,
        subcategories: [
            '종교 전체',
            '종교일반',
            '가톨릭',
            '기독교(개신교)',
            '불교',
            '기타'
        ]
    },
    {
        name: '외국어',
        no: 8,
        subcategories: ['외국어 전체',
            '비즈니스영어',
            '일반영어',
            '제2외국어',
            '어학시험']
    },
    {
        name: '과학',
        no: 9,
        subcategories: [
            '과학 전체',
            '과학일반',
            '수학',
            '자연과학',
            '응용과학']
    },
    {
        name: '진로/교육/교재',
        no: 10,
        subcategories: ['진로/교육/교재 전체',
            '공부법',
            '특목고/자사고',
            '대입 수시',
            '대입 논술',
            '대입 합격수기',
            '진로 탐색',
            '유학/MBA',
            '교재/수험서']
    },
    {
        name: '컴퓨터/IT',
        no: 11,
        subcategories: [
            '컴퓨터/IT 전체',
            'IT 비즈니스',
            '개발/프로그래밍',
            '컴퓨터/앱 활용',
            'IT자격증',
            'IT 해외원서'
        ],
    },
    {
        name: '건강/다이어트',
        no: 12,
        subcategories: [
            '건강/다이어트 전체',
            '다이어트/운동/스포츠',
            '스타일/뷰티',
            '건강'
        ],
    },
    {
        name: '가정/생활',
        no: 13,
        subcategories: [
            '가정/생활 전체',
            '결혼/임신/출산',
            '육아/자녀교육',
            '취미/요리/기타'
        ],
    },
    {
        name: "어린이/청소년",
        no: 14,
        subcategories: [
            '어린이/청소년 전체',
            '유아',
            '어린이',
            '청소년',
        ]
    },
    {
        name: '해외도서',
        no: 15,
        subcategories: ['해외도서 전체']
    },
    {
        name: '잡지',
        no: 16,
        subcategories: ['잡지 전체',
            '경영/재테크',
            '문학/교양',
            '여성/패션/뷰티',
            '디자인/예술',
            '건강/스포츠',
            '취미/여행/요리',
            '과학/IT',
            '종교',
            '만화']
    }
];


function SignUp() {
    const [signUpData, setSignUpData] = useState({});
    const [isPasswordMatch, setPasswordMatch] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]); // 선택한 카테고리 배열 추가
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigate();

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


    // 선택된 카테고리가 2개인지 확인하는 상태
    const isCategoryFull = selectedCategories.length === 2;

    const handleCategoryToggle = (categoryName) => {
        // 이미 선택된 카테고리인지 확인
        if (selectedCategories.includes(categoryName)) {
            // 이미 선택된 경우, 해당 카테고리 제거
            setSelectedCategories((prevSelectedCategories) =>
                prevSelectedCategories.filter((category) => category !== categoryName)
            );
        } else {
            // 최대 2개까지만 선택 가능하도록 로직 추가
            if (selectedCategories.length < 2) {
                // 최대 2개 미만인 경우, 카테고리 추가
                setSelectedCategories((prevSelectedCategories) => [
                    ...prevSelectedCategories,
                    categoryName,
                ]);
            }
        }
    };

    useEffect(() => {
        console.log(enroll_company);
        console.log(selectedCategories);
    }, [selectedCategories]) // 상태변화 체크용

    return (
        <>
        <div className="container-fluid px-2 px-md-4 py-5 mx-auto">
            <div className="col-lg-7" style={{ margin: 'auto' }}>
                <div className="card2 card border-0 px-4 px-sm-5 py-5">
                    <small className="text-right mb-3">
                        <Link to="./../signIn/">
                            <u style={{ color: 'gray', textDecoration: 'none' }}>북스탁 계정이 이미 있나요?</u>
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
                    <div className="row px-3">
                        <label className="mb-0">
                            <h6 className="mb-0 text-sm">관심 카테고리 (최대 2개 선택)</h6>
                        </label>
                        <div className="category-toggle">
                            {categories.map((category) => (
                                <div key={category.name} className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="categories"
                                        value={category.no}
                                        checked={selectedCategories.includes(category.no)}
                                        onChange={() => handleCategoryToggle(category.no)}
                                        disabled={isCategoryFull && !selectedCategories.includes(category.no)}
                                    />
                                    <label className="form-check-label">{category.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="row px-3 mb-3">
                        <small className="text-muted">
                            북스탁에 가입함으로써 <Link to="/terms" className="text-primary">서비스 약관</Link> 및 <Link to="/privacy" className="text-primary"> 및 개인 정보 보호 정책</Link>에 동의합니다.
                        </small>
                    </div>
                    <div className="row mb-4">
                        <div className="col" style={{ border: '0', width: '55%', marginTop: '1rem' }}>
                            <button className="btn btn-blue-signup text-center mb-1 py-2" onClick={handleSignUpSubmit} >계정 만들기</button>
                        </div>
                    </div>
                    <div className="row px-3 mb-4 d-flex align-items-center">
                        <div className="line"></div>
                        <small className="text-muted or text-center">OR</small>
                        <div className="line"></div>
                    </div>

                    <div className="socialLogin" style={{ width: '60%', margin: 'auto' }}>
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center">
                                <img src="/assets/img/kakaoImg.png" style={{ width: '85%', height: '2.7rem', margin: 'auto', cursor: 'pointer', alignItems: 'center', marginRight: '0.5rem' }} alt="카카오 로그인" onClick={handleLoginWithKakao} />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center">
                                <img src="/assets/img/NaverImg.png" style={{ width: '85%', height: '2.7rem', margin: 'auto', cursor: 'pointer', alignItems: 'center', marginLeft: '0.5rem' }} alt="네이버 로그인" onClick={handleLoginWithNaver} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
    );
}


export default SignUp;

