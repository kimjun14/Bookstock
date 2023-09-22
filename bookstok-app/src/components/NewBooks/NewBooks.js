// MainRanking.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NewBooks.css'

const exampleData = [
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        title: '어린왕자',
        author: '생텍쥐페리',
        startPrice: 11000,
        presentPrice: 9000,
        coverImage: 'https://picsum.photos/80/115',
    }
];

function NewBooks() {
    return (
        <div>
            <h2>새로 올라온 도서</h2>
            <div className="row row-cols-3-2">
                {exampleData.map((book, index) => (
                    <div className="col" key={index} style={{ position: "relative" }}>
                        <Link to={`/book/${book.id}`} className="card-link">
                            <div className="card custom-card-new">
                                <img src={book.coverImage} className="card-img" alt={book.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.author}</p>
                                    <p className="card-text">시작 가격: {book.startPrice}원</p>
                                    <p className="card-text">현재 가격: {book.presentPrice}원</p>
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