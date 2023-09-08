import React from 'react';
// import { Link } from 'react-router-dom';
import "./index.css";

function Trading(){
    return(
    <>
    <header>
    </header>

    <article>
        <div className="item">
            <div className="itemImg">
                <img style={{"width" : '480px', "height" : '500px'}} src="https://shopping-phinf.pstatic.net/main_4229259/42292599622.20230906071147.jpg?type=w300" alt='bookImg' />
            </div>
            <div className="itemInfo">
                <h2>
                    <span className="badge text-bg-dark">팝니다</span>
                    <span className="itemTitle">도시와 그 불확실한 벽</span>
                </h2>

                <p>무라카미 하루키 장편소설</p>
                <p>저자 : 무라카미 하루키</p>
                <p>출판사 : 문학동네 </p>
                <p>가격 : 50,000</p>
                <p>판매상태 : 판매중</p>
                <p>발행 : 2023.09.06</p>
            </div>
        </div>

        <div className="detail">
            <div className="detailTitle">
                <h2>상세설명</h2>
            </div>
            <div className="detailInfo">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Culpa nulla dignissimos libero natus. Modi ducimus architecto assumenda accusamus 
                facilis ab provident aut animi consequuntur pariatur? Fugiat maiores laborum mollitia ullam?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Odit molestiae amet, cupiditate facere excepturi ratione aperiam, 
                qui laboriosam provident quibusdam eum sint? 
                Distinctio temporibus quam dolorum. Temporibus consectetur inventore possimus!
            </div>
        </div>

        <div className="bid">
            <h2>경매 입찰</h2>
            <div className="bidInfo">등록된 입찰이 없습니다.</div>
        </div>

        <div className="bidsection">
            <div className="card-footer">
                <div className="bid">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="입찰 가격을 입력하세요" />
                        <button type="button" className="btn btn-success">입찰하기</button>
                    </div>
                </div>
            </div>
        </div>
    </article>
    </>
    )
}

export default Trading;