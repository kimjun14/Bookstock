import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './aucComponent.css'

const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function AuctionSlider() {
  const [auctionData, setAuctionData] = useState([]);
  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 기본값
    slidesToScroll: 2, // 기본값
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConnect.get('/mypage/auction');
        setAuctionData(response.data);
        // 데이터 수에 따라 슬라이더 설정 업데이트
        if (response.data.length <= 3) {
          setSliderSettings(prevSettings => ({
            ...prevSettings,
            slidesToShow: response.data.length, // 데이터 수에 맞게 조정
            slidesToScroll: 1, // 선택적: 한 번에 스크롤할 슬라이드 수를 조정할 수 있습니다.
          }));
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

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

  // if (Desktop) {
  //   sliderSettings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 4,
  //     slidesToScroll: 2
  //   };
  // } else if (Tablet) {
  //   sliderSettings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 2,
  //     slidesToScroll: 1
  //   };
  // } else if (Mobile) {
  //   sliderSettings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   };
  // }

  return (
    <>
      <Desktop>
        <div className="auction-slider-container">
          {auctionData.length > 0 ? (
            <Slider {...sliderSettings} className="my-slider">
              {auctionData.map((auction, index) => (
                <Link key={index} to={`/trading?id=${auction.auctionId}`} className="tradingLink card-link">
                  <div className="card auction-card">
                    <img src={auction.bookImgSrc} alt={auction.bookTitle} className="card-img-top" />
                    <div className="card-body">
                      <h4 className="card-title">{auction.bookTitle}</h4>
                      <p className="card-text">{auction.bookAuthor}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p>등록된 도서가 없습니다.</p>
          )}
        </div>
      </Desktop>
      <Tablet>
        <div className="auction-slider-container">
          {auctionData.length > 0 ? (
            <Slider {...sliderSettings} className="my-slider">
              {auctionData.map((auction, index) => (
                <Link key={index} to={`/trading?id=${auction.auctionId}`} className="tradingLink card-link">
                  <div className="card auction-card">
                    <img src={auction.bookImgSrc} alt={auction.bookTitle} className="card-img-top" />
                    <div className="card-body">
                      <h4 className="card-title">{auction.bookTitle}</h4>
                      <p className="card-text">{auction.bookAuthor}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p>등록한 역경매 도서가 없습니다.</p>
          )}
        </div>
      </Tablet>
      <Mobile>
        <div className="auction-slider-container">
          {auctionData.length > 0 ? (
            <Slider {...sliderSettings} className="my-slider">
              {auctionData.map((auction, index) => (
                <Link key={index} to={`/trading?id=${auction.auctionId}`} className="tradingLink card-link">
                  <div className="card auction-card">
                    <img src={auction.bookImgSrc} alt={auction.bookTitle} className="card-img-top" />
                    <div className="card-body">
                      <h4 className="card-title">{auction.bookTitle}</h4>
                      <p className="card-text">{auction.bookAuthor}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </Mobile>
    </>
  );
}

export default AuctionSlider;
