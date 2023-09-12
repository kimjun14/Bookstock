import React from 'react';
import { Link } from 'react-router-dom';

function SearchResult() {
  return (
    <>
      {/* 부트스트랩 css 라이브러리 이용 */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      {/* Body, 검색 결과 제공 */}
      <div className="container bg-light">
        {/* 검색 창 표시 row */}
        {/* 검색 버튼 누르면 ?title(key)=검색내용(value)를 get으로 던짐 */}
        <div className="row">
          <form action="/" method="get">
            <div className="input-group p-3 d-flex justify-content-center">
              <input
                className="w-75 me-2"
                type="text"
                placeholder="책 이름 검색"
                name="title"
              />
              <span className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  검색
                </button>
              </span>
            </div>
          </form>
        </div>
        {/* 검색 내용 표시 row */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="row p-2 d-flex align-items-center"
          >
            <div className="col-md-3 col-sm-6">
              <Link to="/trading">
                <img
                  className="img-fluid"
                  alt="searchImg"
                  src="https://shopping-phinf.pstatic.net/main_4019202/40192022618.20230620100239.jpg"
                />
              </Link>
            </div>
            <div className="col-md-9 col-sm-6">
              <div className="d-flex align-items-start">
                <span className="col-2">제목</span>
                <span className="col-10">: 타입스크립트, 리액트, Next.js...</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">작가</span>
                <span className="col-10">: 테지마 타쿠야...</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">출판사</span>
                <span className="col-10">: 위키북스</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">출판일</span>
                <span className="col-10">: 20230530</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">ISBN</span>
                <span className="col-10">: 9791158394332</span>
              </div>
              <div>TypeScript/React/Next.js로 실전적인...</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResult;
