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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosConnect.get('/mypage/auction');
        setAuctionData(response.data);
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

  let sliderSettings;

  if (Desktop) {
    sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2
    };
  } else if (Tablet) {
    sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
  } else if (Mobile) {
    sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  }

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
            <p>No data available.</p>
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
            <p>No data available.</p>
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
