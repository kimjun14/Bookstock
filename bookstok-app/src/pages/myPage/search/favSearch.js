import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favSearch.css'
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function BookSearchResult() {
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });
  // eslint-disable-next-line
  const [books, setBooks] = useState([]);

  const fetchSearchList = async () => {
    try{
        const response=await axiosConnect.get(`/mypage/favpage`)
        setBooks(response.data);
    }catch(err){
        console.error(err);
    }
  }

  const fetchSuggestion = async(data) =>{
    try {
      await axiosConnect.post(`/auctions/suggest/star`,{aId:data})
      console.log("OK")
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=>{
      fetchSearchList();
  },[]);

  const AuctionCreateAt = (dateString) => {
    const Date = moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    return Date;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>도서 검색 결과</h1>
      {/* 정렬 버튼 */}
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className="btn btn-recent">최신순</button>
        <button type="button" className="btn btn-title">제목순</button>
        <button type="button" className="btn btn-pop">인기순</button>
      </div>
      {/* 검색 결과 표 */}
      <table className={`searchTable ${isMobile ? 'mobile' : isTablet ? 'tablet' : ''}`}>
        <thead style={{
          backgroundColor: '#f3f3f3'
        }}>
          <tr>
            <th scope="col">번호</th>
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
              <th scope="row">{book.index}</th>
              <td><img src={book.bookImgSrc ? book.bookImgSrc : "http://via.placeholder.com/120x160"} alt="" className='searchBookImg' /></td>
              <td><Link to={`/trading?id=${book.auctionId}`}>{book.bookTitle}</Link></td>
              <td>시작가: {book.auctionPrice}원
                <br />현재가: 추후 구현 예정</td>
              <td><Link to={`/`}>{book.nickname} </Link></td>
              <td>{AuctionCreateAt(book.auctionStart)} /<br />{AuctionCreateAt(book.auctionEnd)}</td>
              <td>{book.viewCount}</td>
              <td>

                {/* 관심등록 버튼 */}
                <button onClick={()=>fetchSuggestion(book.auctionId)} className='interestBtn'>
                  <img
                    src="http://localhost:12345/images/star.png"
                    alt=""
                    width="20px"
                  /> {book.star}
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
