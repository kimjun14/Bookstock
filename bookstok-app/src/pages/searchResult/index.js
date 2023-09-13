import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  async function QuerySend(query) {
    try {
      const response = await axios.post('http://220.127.80.225:12345/api/search', { query });
      return response.data;
    } catch (error) {
      console.error("쿼리 전송 실패", error);
      setError(error); // 에러 상태 설정
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await QuerySend(query);
      setData(result);
    }
    fetchData();
  }, [query]);

  if (error) {
    return <div>검색 중 오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 로드 중입니다...</div>;
  }  

  // 이하 코드는 header에서 쓴 코드 재사용
    // 1. 검색창 핸들러
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    // 2. 폼 제출 핸들러
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`?query=${searchTerm}`);
    };
    console.log(data);

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
        {/* 검색 버튼 누르면 ?query(key)=검색내용(value)를 post으로 던짐 */}
        <div className="row">
          <form action="/" onSubmit={handleSearchSubmit}>
            <div className="input-group p-3 d-flex justify-content-center">
              <input
                className="w-75 me-2"
                type="text"
                placeholder={query||"책 이름 검색"}
                name="title"
                value={searchTerm} 
                onChange={handleSearchChange}
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
        {data.docs.map((book,index) => (
          <div
            key={index}
            className="row p-2 d-flex align-items-center"
          >
            <div className="col-md-3 col-sm-6">
              <Link to="/trading">
                <img
                  className="img-fluid"
                  alt={book.TITLE}
                  src={book.TITLE_URL}
                />
              </Link>
            </div>
            <div className="col-md-9 col-sm-6">
              <div className="d-flex align-items-start">
                <span className="col-2">제목</span>
                <span className="col-10">: {book.TITLE}</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">작가</span>
                <span className="col-10">: {book.AUTHOR}</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">출판사</span>
                <span className="col-10">: {book.PUBLISHER}</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">출판일</span>
                <span className="col-10">: {book.PUBLISH_PREDATE}</span>
              </div>
              <div className="d-flex align-items-start">
                <span className="col-2">ISBN</span>
                <span className="col-10">: {book.EA_ISBN?book.EA_ISBN:book.SET_ISBN}</span>
              </div>
              <div>내용 분류를 위한 부가기호 : {book.EA_ADD_CODE ? book.EA_ADD_CODE : book.SET_ADD_CODE}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResult;
