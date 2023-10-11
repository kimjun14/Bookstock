import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './newIndex.css'
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';


// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function BookSearchResult() {
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });
  // eslint-disable-next-line
  const navigation = useNavigate();
  const URLquery = useLocation();
  const queryParams = new URLSearchParams(URLquery.search);
  const searchKey = queryParams.get('query')
  const category = queryParams.get('category')
  // 자세한 설명은 Trading 참고, 쿼리 문자열의 query(key),검색어(value) 받아옴 
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchSearchList = async () => {
    try {
      console.log(filter)
      const response = await axiosConnect.get(`/auctions/search?query=${searchKey}&mode=${filter}&category=${category}`)
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchSuggestion = async (data) => {
    try {
      await axiosConnect.post(`/auctions/suggest/star`, { aId: data })
      console.log("OK")
      fetchSearchList()
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (URLquery.search) {
      fetchSearchList();
    } else {    // URL/searchResult 같이 쿼리 없이 접근하면
      alert("잘못 된 접근입니다.");    // id쿼리 없이 들어가면 오류 메세지 나오고
      navigation('/');                // 홈('/')화면으로 보내버림 (추후 변경 할 수도)
    }
  }, [searchKey,filter,category]);

  const AuctionCreateAt = (dateString) => {
    const Date = moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    return Date;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>도서 검색 결과</h1>
      {/* 정렬 버튼 */}
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-recent" onClick={() => setFilter("")}>최신순</button>
        <button type="button" className="btn btn-title" onClick={() => setFilter("1")}>제목순</button>
        <button type="button" className="btn btn-pop" onClick={() => setFilter("2")}>인기순</button>
      </div>
      {/* 검색 결과 표 */}
      <table className={`searchTable ${isMobile ? 'mobile' : isTablet ? 'tablet' : ''}`}>
        <thead style={{
          backgroundColor: '#f3f3f3'
        }}>
          <tr>
            <th scope="col">표지</th>
            <th scope="col">도서명</th>
            <th scope="col">가격</th>
            <th scope="col">등록자명</th>
            <th scope="col">등록일/마감일</th>
            <th scope="col">조회수</th>
            <th scope="col">관심등록</th>
          </tr>
        </thead>
        <tbody className="table-group-divider" style={{ marginBottom: '2rem' }}>
          {books.map((book) => (
            <tr key={book.index}>
              <td><img src={book.bookImgSrc ? book.bookImgSrc : "http://via.placeholder.com/120x160"} alt="" className='searchBookImg' /></td>
              <td><Link to={`/trading?id=${book.auctionId}`}>{book.bookTitle}</Link></td>
              <td>시작가: {book.auctionPrice}원
                <br />현재가: 추후 구현 예정</td>
              <td><Link to={`/`}>{book.nickname} </Link></td>
              <td>{AuctionCreateAt(book.auctionStart)} /<br />{AuctionCreateAt(book.auctionEnd)}</td>
              <td>{book.viewCount}</td>
              <td>

                {/* 관심등록 버튼 */}
                <button onClick={() => fetchSuggestion(book.auctionId)} className='interestBtn'>{book.star ? <AiFillHeart color="black" size={20} /> : <AiOutlineHeart size={20} />}
                  <br></br>{book.star}
                  <img
                    src="http://localhost:12345/images/star.png"
                    alt=""
                    width="20px"
                  />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookSearchResult;