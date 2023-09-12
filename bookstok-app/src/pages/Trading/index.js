import React, { useState } from 'react';
import './index.css';

function Trading() {
    const [bidAmount, setBidAmount] = useState("");

    const handleBidChange = (e) => {
        setBidAmount(e.target.value);
    }

    const handleBidSubmit = () => {
        console.log("입찰금액:", bidAmount);
    }

    return (
        <>
            <article>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="item">
                                <div className="itemImg">
                                    <img
                                        src="https://shopping-phinf.pstatic.net/main_4229259/42292599622.20230906071147.jpg?type=w300"
                                        alt="bookImg"
                                        className="img-fluid" // 이미지 플루이드 반응형
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="itemInfo">
                                <h2>
                                    <span className="badge text-bg-dark">팝니다</span>
                                    <span className="itemTitle"> 도시와 그 불확실한 벽</span>
                                </h2>

                                <p>무라카미 하루키 장편 소설</p>
                                <p>작가: 무라카미 하루키</p>
                                <p>출판사: 문학동네</p>
                                <p>가격: 50,000</p>
                                <p>판매상태: 판매중</p>
                                <p>출판일: 2023.09.06</p>
                            </div>
                        </div>
                    </div>

                    <div className="card text-center">
                        <div className="card-header">
                            상세설명
                        </div>
                        <div className="card-body">
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>

                    <div id="bid" className="mt-5 mb-3">
                        <h2>역경매 입찰</h2>
                    </div>
                    <div className='d-flex flex'>
                        <div className="card mb-3" style={{ minWidth: "50%" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="..." className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">15,000원</h5>
                                        <p className="card-text">상태 : a급, 포토카드 같이 드려요</p>
                                        <p className="card-text"><small className="text-body-secondary">3분전 업데이트 됨</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3" style={{ minWidth: "50%" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src="..." className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">14,000원</h5>
                                        <p className="card-text">상태좋음</p>
                                        <p className="card-text"><small className="text-body-secondary">1분전 업데이트 됨</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-floating">
                            <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} ></textarea>
                            <label htmlFor="floatingTextarea2">상품 정보를 입력하세요</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mt-2">
                            <input type="file" className="form-control" id="inputGroupFile04" />
                            <input type="text" className="form-control" placeholder="입찰금액을 입력하세요" value={bidAmount} onChange={handleBidChange} />
                            <button className="btn btn-success mt-0" type="button" id="inputGroupFileAddon04" onClick={handleBidSubmit}>
                                입찰 하기
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Trading;
