import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
  return isMobile ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 })
  return isTablet ? children : null
}


const AuctionProgressInfoComponent = () => {
  const [myAuctionInfo, setMyAuctionInfo] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axiosConnect.get(`/mypage/auction`)
      setMyAuctionInfo(response.data);
      console.log(myAuctionInfo, response)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <Desktop>
      <div id="bid" className="mt-5 mb-0">
          <h2>경매 등록 내역</h2>
        </div>
        <div>
          <div>
            {myAuctionInfo.map((auction, index) => (

              <div key={auction.auctionId} className="container text-center">
                <Link to={`/trading?id=${auction.auctionId}`}>
                  <div className="card mb-4">
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <img src={auction.bookImgSrc} alt={auction.bookTitle} style={{ width: '30%' }} />
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className='list-group-item'>
                        <h5 className="card-title">{auction.auctionTitle}</h5>
                      </li>
                      <li className='list-group-item'>
                        <strong>가격:</strong> {auction.auctionPrice}
                      </li>
                      <li className='list-group-item'>
                        <p className="card-text">{auction.auctionContext}</p>
                      </li>
                      <li className="list-group-item">
                        <strong>게시일:</strong> {new Date(auction.auctionStart).toLocaleDateString()}
                      </li>
                      <li className="list-group-item">
                        <strong>책 제목:</strong> {auction.bookTitle}
                      </li>
                      <li className="list-group-item">
                        <strong>출판사:</strong> {auction.bookPub}
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>

            ))}
          </div>
        </div>
      </Desktop>
      <Tablet>
        <div id="bid" className="mt-5 mb-0">
          <h2>경매 등록 내역</h2>
        </div>
        <div>
          <div>
            {myAuctionInfo.map((auction, index) => (

              <div key={auction.auctionId} className="container text-center">
                <Link to={`/trading?id=${auction.auctionId}`}>
                  <div className="card mb-4">
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <img src={auction.bookImgSrc} alt={auction.bookTitle} style={{ width: '50%' }} />
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className='list-group-item'>
                        <h5 className="card-title">{auction.auctionTitle}</h5>
                      </li>
                      <li className='list-group-item'>
                        <strong>가격:</strong> {auction.auctionPrice}
                      </li>
                      <li className='list-group-item'>
                        <p className="card-text">{auction.auctionContext}</p>
                      </li>
                      <li className="list-group-item">
                        <strong>게시일:</strong> {new Date(auction.auctionStart).toLocaleDateString()}
                      </li>
                      <li className="list-group-item">
                        <strong>책 제목:</strong> {auction.bookTitle}
                      </li>
                      <li className="list-group-item">
                        <strong>출판사:</strong> {auction.bookPub}
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>

            ))}
          </div>
        </div>
      </Tablet>
      <Mobile>
        <div id="bid" className="mt-5 mb-0">
          <h2>경매 등록 내역</h2>
        </div>
        <div>
          <div>
            {myAuctionInfo.map((auction, index) => (

              <div key={auction.auctionId} className="container text-center">
                <Link to={`/trading?id=${auction.auctionId}`}>
                  <div className="card mb-4">
                    <div className="card-body d-flex align-items-center">
                      <img src={auction.bookImgSrc} alt={auction.bookTitle} style={{ width: '100%' }} />
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className='list-group-item'>
                        <h5 className="card-title">{auction.auctionTitle}</h5>
                      </li>
                      <li className='list-group-item'>
                        <strong>가격:</strong> {auction.auctionPrice}
                      </li>
                      <li className='list-group-item'>
                        <p className="card-text">{auction.auctionContext}</p>
                      </li>
                      <li className="list-group-item">
                        <strong>게시일:</strong> {new Date(auction.auctionStart).toLocaleDateString()}
                      </li>
                      <li className="list-group-item">
                        <strong>책 제목:</strong> {auction.bookTitle}
                      </li>
                      <li className="list-group-item">
                        <strong>출판사:</strong> {auction.bookPub}
                      </li>
                    </ul>
                  </div>
                </Link>
              </div>

            ))}
          </div>
        </div>
      </Mobile>
    </>
  );
}

export default AuctionProgressInfoComponent;