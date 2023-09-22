import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainRanking.css';

const exampleData = [
    {
        id: 1,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 2,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 3,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 4,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 5,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 6,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 7,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 8,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 9,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 10,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 11,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },
    {
        id: 12,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://picsum.photos/80/115',
    },

];

function MainRanking() {
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지당 아이템 개수와 현재 페이지를 기반으로 해당 페이지의 데이터를 가져오는 함수
    const getPageData = (data, itemsPerPage, page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    // 한 페이지에 표시할 아이템 개수
    const itemsPerPage = 6;

    // 현재 페이지의 데이터를 가져옵니다.
    const currentData = getPageData(exampleData, itemsPerPage, currentPage);

    // 현재 페이지의 순위를 계산합니다.
    const currentRanking = (currentPage - 1) * itemsPerPage;

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(exampleData.length / itemsPerPage);

    // 다음 버튼 활성화 여부 확인
    const hasNextPage = currentPage < totalPages;

    // 이전 버튼 활성화 여부 확인
    const hasPrevPage = currentPage > 1;

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    return (
        <div>
            <h2>실시간 인기 도서</h2>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {currentData.map((book, index) => (
                    <div className="col" key={book.id} style={{ position: "relative" }}>
                        <Link to={`/auction/${book.id}`} className="card-link"> 
                            <div className="card custom-card"> 
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={book.coverImage} className="card-img" alt={book.title} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{book.title}</h5>
                                            <p className="card-text">{book.author}</p>
                                            <p className="card-text">평점: {book.rating}</p>
                                            <p className="card-text">조회수: {book.views}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="rank-badge">{currentRanking + index + 1}</div> {/* 순위 표시 */}
                    </div>
                ))}
            </div>

            {/* 이전 다음버튼 */}
            <div className="d-flex justify-content-center my-3">
                <button
                    onClick={() => prevPage()}
                    disabled={!hasPrevPage}
                    className="btn btn btn-blue mx-1"
                    style={{ width: "10%" }}
                >
                    이전
                </button>
                <button
                    onClick={() => nextPage()}
                    disabled={!hasNextPage}
                    className="btn btn btn-blue mx-1"
                    style={{ width: "10%" }}
                >
                    다음
                </button>
            </div>
        </div>
    );
}

export default MainRanking;
