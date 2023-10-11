import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favSearch.css'
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
  const [books, setBooks] = useState([]);
  const [bidData, setBidData] = useState([]);
  const [bookData, setBookData] = useState([]);


  const fetchSearchList = async () => {
    try{
        const response=await axiosConnect.get(`/mypage/favpage`)
        setBooks(response.data);
    }catch(err){
        console.error(err);
    }
  }

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
      <h1 style={{ textAlign: 'center' }}>관심 등록한 경매 목록</h1>
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
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                          </svg> {bidItem.bidData[0]?.bidprice ? `${bidItem.bidData[0]?.bidprice}원` : '입찰 금액 없음'}
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
