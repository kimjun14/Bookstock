// MainRanking.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import calculateProgress from './progressbar';
import './NewBooks.css'

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

function NewBooks() {
    const [bookData, setBookData] = useState([]);

    const newBookFetcher = async () => {
        try {
            const response = await axiosConnect.get('test/mainpagetest')
            setBookData(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            console.log(bookData);
        }
    }

    useEffect(() => {
        newBookFetcher();
    }, []);

    return (
        <div>
            <h2>새로 올라온 도서</h2>
            <div className="row row-cols-3-2 newBooks-card">
                {bookData.map((bookData) => (
                    <div className="col" key={bookData.index}>
                        <Link to={`/trading?id=${bookData.auctionId}`} className="card-link">
                            <div className="card custom-card-new">
                                <img src={bookData.bookImgSrc} className="card-img" alt={bookData.bookTitle} />
                                <div className="card-body">
                                    <h5 className="card-title">{bookData.bookTitle}</h5>
                                    <p className="card-text">{bookData.bookAuthor}</p>
                                    <p className="card-text">시작 가격: {bookData.auctionPrice}원</p>
                                    <p className="card-text">현재 가격: 9000원</p>
                                    <ProgressBar
                                        now={calculateProgress(bookData.currentPrice, bookData.auctionPrice)}
                                        label={`${calculateProgress(bookData.currentPrice, bookData.auctionPrice)}%`}
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewBooks;
