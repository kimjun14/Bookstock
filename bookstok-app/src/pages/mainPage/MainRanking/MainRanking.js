import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './MainRanking.css';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function MainRanking() {
  const [bookData, setBookData] = useState([]);

  const rankBookFetcher = async () => {
    try {
      const response = await axiosConnect.get('test/mainpagetest2');
      setBookData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    rankBookFetcher();
  }, []);

  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 576, maxWidth: 991 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 575 });

  const getSliderSettings = () => {
    if (isDesktop) {
      return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2
      };
    } else if (isTablet) {
      return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
      };
    } else if (isMobile) {
      return {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    }
  };

  return (
    <div>
      <h2 className='rankingBookTitle'>실시간 인기 도서</h2>
      <div className="book-slider-container">
        {bookData.length > 0 ? (
          <Slider {...getSliderSettings()}>
            {bookData.map((book, index) => (
              <Link to={`/trading?id=${book.auctionId}`} className="tradingLink card-link" key={index}>
                <div className="book-slide">
                  <div className="d-flex flex-column align-items-center rankingBooks-card">
                    <span className="rank-badge">{index + 1}</span>
                    <img src={book.bookImgSrc} alt={book.bookTitle} />
                    <h4 className='bookTitle-text'>{book.bookTitle}</h4>
                    <p className='bookAuthor-text'>{book.bookAuthor}</p>
                  </div>
                </div>
              </Link>)
            )}
          </Slider>
        ) : (
          <p> loading...</p>
        )}
      </div>
    </div>
  );
}

export default MainRanking;
