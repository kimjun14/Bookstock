import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MainRanking.css';

const exampleData = [
    {
        id: 1,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 2,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 3,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 4,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 5,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 6,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
        id: 7,
        title: '상수리나무 아래',
        author: '서말 외 3명',
        episode: '4화 무료',
        rating: 4.9,
        views: 41783,
        coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    // 다른 책 데이터도 추가할 수 있습니다.
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

    // 다음 버튼 활성화 여부 확인
    const hasNextPage = exampleData.length > currentPage * itemsPerPage;

    // 이전 버튼 활성화 여부 확인
    const hasPrevPage = currentPage > 1;

    // 다음 페이지로 이동하는 함수
    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // 이전 페이지로 이동하는 함수
    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div>
            <h2>실시간 인기 경매</h2>
            <Container>
                <Row>
                    {currentData.map((book, index) => (
                        <Col xs={12} sm={6} md={4} lg={4} key={book.id}>
                            <Link to={`/auction/${book.id}`} className="grid-item">
                                <div className="item-content">
                                    {/* 사진 */}
                                    <img src={book.coverImage} alt={book.title} width="80" height="115" />
                                    {/* 순위 */}
                                    <p className='ranking'>{itemsPerPage * (currentPage - 1) + index + 1}</p>
                                    {/* 설명 */}
                                    <p className='bookDesc'>
                                        <strong>{book.title}</strong>
                                        <br />
                                        {book.author}
                                        <br />
                                        {book.episode}
                                        <br />
                                        평점: {book.rating}
                                        <br />
                                        조회수: {book.views}
                                    </p>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
            <div className="pagination">
                <button onClick={() => prevPage()} disabled={!hasPrevPage}>
                    이전
                </button>
                <button onClick={() => nextPage()} disabled={!hasNextPage} className="mx-2">
                    다음
                </button>
            </div>
        </div>
    );
}

export default MainRanking;
