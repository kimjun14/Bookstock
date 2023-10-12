import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import './aucComponent.css';

const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true,
});

function AuctionSlider() {
  const [auctionData, setAuctionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConnect.get('/mypage/auction');
        setAuctionData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };

  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 });
    return isTablet ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 });
    return isMobile ? children : null;
  };

  return (
    <>
      <Desktop>
        <div className="auction-container">
          {auctionData.length > 0 ? (
            <table className="table table-bordered">
              <tbody>
                {auctionData.map((auction, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        <img src={auction.bookImgSrc} alt={auction.bookTitle} />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        {auction.bookTitle}
                      </Link>
                    </td>
                    <td>{auction.bookAuthor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>등록된 도서가 없습니다.</p>
          )}
        </div>
      </Desktop>
      <Tablet>
        <div className="auction-container">
          {auctionData.length > 0 ? (
            <table className="table table-bordered">
              <tbody>
                {auctionData.map((auction, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        <img src={auction.bookImgSrc} alt={auction.bookTitle} />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        {auction.bookTitle}
                      </Link>
                    </td>
                    <td>{auction.bookAuthor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>등록한 역경매 도서가 없습니다.</p>
          )}
        </div>
      </Tablet>
      <Mobile>
        <div className="auction-container">
          {auctionData.length > 0 ? (
            <table className="table table-bordered">
              <tbody>
                {auctionData.map((auction, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        <img src={auction.bookImgSrc} alt={auction.bookTitle} />
                      </Link>
                    </td>
                    <td>
                      <Link to={`/trading?id=${auction.auctionId}`} className="tradingLink">
                        {auction.bookTitle}
                      </Link>
                    </td>
                    <td>{auction.bookAuthor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </Mobile>
    </>
  );
}

export default AuctionSlider;
