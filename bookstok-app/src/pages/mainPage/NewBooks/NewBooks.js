import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import './NewBooks.css'
import ProgressBar from './progressbar';
import { Link } from 'react-router-dom';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

function NewBooks() {
    const [bookData, setBookData] = useState([]);

    const newBookFetcher = async () => {
        try {
            const response = await axiosConnect.get('test/mainpagetest');
            setBookData(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        newBookFetcher();
    }, []);

    // 슬라이더 설정
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: bookData.length > 3 ? 3 : bookData.length,
        slidesToScroll: 2
    };

    const calculateProgress = (currentPrice, auctionPrice) => {
        if (auctionPrice === 0) {
            return 0; // Handle division by zero
        }
        return ((currentPrice / auctionPrice) * 100).toFixed(2);
    };

    return (
        <>
            <h2 className='newBookTitle'>새로 올라온 도서</h2>
            <div className="book-slider-container">
                {bookData.length > 0 ? (
                    <Slider {...settings}>
                        {bookData.map((book) => (
                            <Link to={`/trading?id=${book.auctionId}`} className="tradingLink card-link">
                                <div key={book.index} className="book-slide">
                                    <div className="d-flex flex-column align-items-center newBooks-card">
                                        <img src={book.bookImgSrc} alt={book.bookTitle} />
                                        <h4 className='bookTitle-text'>{book.bookTitle}</h4>
                                        <p className='bookAuthor-text'>{book.bookAuthor}</p>
                                        <p className="auctionPrice-text">시작 {book.auctionPrice}원</p>
                                        <p className="presentPrice-text">현재 9000원</p>
                                        <ProgressBar
                                            now={calculateProgress(book.currentPrice, book.auctionPrice)}
                                            label={`${calculateProgress(book.currentPrice, book.auctionPrice)}%`}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                            </Slider>
                        ) : (
                        // 데이터가 로딩 중일 때 표시할 내용
                        <p>Loading...</p>
                )}
                    </div>
        </>
            );
}

            export default NewBooks;
