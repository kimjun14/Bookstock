import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './recentSearch.css'
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true
});

function BookSearchResult() {
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });
  // eslint-disable-next-line
  const [books, setBooks] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [bidData, setBidData] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axiosConnect.get('test/mainpagetest');
        setBookData(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchBookData();
  }, []);

  useEffect(() => {
    const fetchBidData = async () => {
      try {
        const promises = bookData.map(async (book) => {
          const bidResponse = await axiosConnect.get(`test/mainbidprice/${book.auctionId}`);
          console.log("비드데이터", bidResponse);
          return { auctionId: book.auctionId, bidData: bidResponse.data };
        });

        const bidResults = await Promise.all(promises);

        setBidData(bidResults);
      } catch (err) {
        console.log(err);
      }
    }

    if (bookData.length > 0) {
      fetchBidData();
    }
  }, [bookData]);

  const fetchSearchList = async () => {
    try {
      const response = await axiosConnect.get(`/mypage/recentpage`)
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
    fetchSearchList();
  }, []);

  const AuctionCreateAt = (dateString) => {
    const Date = moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    return Date;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>도서 검색 결과</h1>
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
                <br />현재가:
                {bidData
                .filter((bidItem) => bidItem.auctionId === book.auctionId)
                .map((bidItem) => (
                  <p className="presentPrice-text" key={bidItem.auctionId}>
                    {bidItem.bidData[0]?.bidprice ? `${bidItem.bidData[0]?.bidprice}원` : '입찰 금액 없음'}
                  </p>
                ))
              }</td>
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
