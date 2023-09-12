import React from 'react';
import { Link } from "react-router-dom";

const MyPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2" style={{ marginLeft: "4rem" }}>
                    <p>마이북스탁</p>
                    <Link to="/mypage" className="text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                        </svg>
                        <span className="text-black"> 마이북스탁 홈</span>
                    </Link>
                    <hr />

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-book-fill" viewBox="0 0 16 16">
                        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                    </svg>
                    <span> 책</span>
                    <br />

                    <Link to="/" className="ms-4 text-decoration-none text-black">선호상품</Link><br />
                    <Link to="/" className="ms-4 text-decoration-none text-black">최근 조회한 상품</Link><br />
                    <hr />

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    </svg>
                    <span> 개인</span>
                    <br />

                    <Link className="ms-4 text-decoration-none text-black" to="/">내 정보 관리</Link><br />
                    <Link className="ms-4 text-decoration-none text-black" to="/">1:1 문의</Link><br />
                    <Link className="ms-4 text-decoration-none text-black" to="/">기기 관리</Link><br />
                    <Link className="ms-4 text-decoration-none text-black" to="/">리뷰 관리</Link><br />
                </div>

                <div className="col-md-9" style={{ marginTop: "10px" }}>
                    <div className="col-md-12 p-4 rounded d-flex flex-row" style={{ border: "1px solid #bcbdbe" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#bcbdbe" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>

                        <div className="ms-4 mt-2" style={{ border: "0px solid blue" }}>
                            <span>
                                <b className="fs-5">userId</b>
                            </span><br />
                            <span className="text-black-50">
                                email
                            </span><br />
                            <button className="mt-1 btn btn-secondary btn-sm">프로필 관리</button>
                        </div>

                        <div className="col-md-2" style={{ marginLeft: "auto", marginRight: "4rem", display: "flex", alignItems: "center" }}>
                            <div style={{ borderRight: "1px solid #bcbdbe", paddingRight: "1rem" }}>
                                <span className="mx-5">
                                    <div>일반회원</div>
                                    <div>다음 등급까지 0페이지 남았습니다.</div>
                                </span>
                            </div>
                            {/* 일반회원이랑 예치금 박스안으로 들어가게 반응형으로 수정했어요. 그런데 일반회원 텍스트가 왜저러는지 모르겠네요ㅜㅜ */}

                            <div style={{ marginLeft: "3rem" }}>
                            <span >
                                    <div>예치금</div>
                                    <div>10,000</div>
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="fs-4 mt-5 mb-4 ms-2 fw-bold">경매 진행 내역</div>

                    <div className="border rounded">
                        <div className="d-flex flex-row mb-3 justify-content-around">
                            <div className="p-2 ms-4">
                                <Link to="#" className="text-decoration-none">
                                    <p className="fs-5 mt-4 text-black">입찰중</p>
                                    <p className="text-center text-black">0</p>
                                </Link>
                            </div>

                            <div className="p-2 ms-4">
                                <Link to="#" className="text-decoration-none">
                                    <p className="fs-5 mt-4 text-black">판매완료</p>
                                    <p className="text-center text-black">0</p>
                                </Link>
                            </div>

                            <div className="p-2 ms-4">
                                <Link to="#" className="text-decoration-none">
                                    <p className="fs-5 mt-4 text-black">역경매등록</p>
                                    <p className="text-center text-black">0</p>
                                </Link>
                            </div>

                            <div className="p-2 ms-4">
                                <Link to="#" className="text-decoration-none">
                                    <p className="fs-5 mt-4 text-black">구매중</p>
                                    <p className="text-center text-black">0</p>
                                </Link>
                            </div>

                            <div className="p-2 ms-4">
                                <Link to="#" className="text-decoration-none">
                                    <p className="fs-5 mt-4 text-black">구매완료</p>
                                    <p className="text-center text-black">0</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 ">
                        <div>
                            <p className="text-center">거래 내역이 없습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
