// MainRanking.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NewBooks.css'
import axios from 'axios';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

// title: '어린왕자',
// author: '생텍쥐페리',
// startPrice: 11000,
// presentPrice: 9000,
// coverImage: 'https://picsum.photos/80/115',
// 쓰지 않으니 레거시 코드의 일부만 남깁니다.

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
            <div className="row row-cols-3-2">
                {bookData.map((bookData) => (
                    <div className="col" key={bookData.index} style={{ position: "relative" }}>
                        <Link to={`/trading?id=${bookData.auctionId}`} className="card-link">
                            <div className="card custom-card-new" style={{ display: 'flex', flexDirection: 'column' }}>
                                <img src={bookData.bookImgSrc} className="card-img" alt={bookData.bookTitle} style={{ height: '450px' }} />
                                <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h5 className="card-title">{bookData.bookTitle}</h5>
                                    <p className="card-text">{bookData.bookAuthor}</p>
                                    <p className="card-text">시작 가격: {bookData.auctionPrice}원</p>
                                    <p className="card-text">현재 가격: 9000원</p>
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