import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // 부트스트랩 그리드 컴포넌트 가져오기
import './MainRanking.css'; // 스타일 파일을 import 해주세요.
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
      id: 1,
      title: '상수리나무 아래',
      author: '서말 외 3명',
      episode: '4화 무료',
      rating: 4.9,
      views: 41783,
      coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
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
      id: 1,
      title: '상수리나무 아래',
      author: '서말 외 3명',
      episode: '4화 무료',
      rating: 4.9,
      views: 41783,
      coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
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
      id: 1,
      title: '상수리나무 아래',
      author: '서말 외 3명',
      episode: '4화 무료',
      rating: 4.9,
      views: 41783,
      coverImage: 'https://placekitten.com/80/115', // 책 표지 이미지 URL
    },
    {
      id: 1,
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
  const [currentPage, setCurrentPage] = useState(0);

  // 페이지당 아이템 개수와 현재 페이지를 기반으로 해당 페이지의 데이터를 가져오는 함수
  const getPageData = (data, itemsPerPage, page) => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // 한 페이지에 표시할 아이템 개수
  const itemsPerPage = 9;

  // 현재 페이지의 데이터를 가져옵니다.
  const currentData = getPageData(exampleData, itemsPerPage, currentPage);

  // 다음 페이지로 이동하는 함수
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // 이전 페이지로 이동하는 함수
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div>
      <h2>실시간 경매 랭킹</h2>
      <Container>
        <Row>
          {currentData.map((book) => (
            <Col xs={12} sm={6} md={4} lg={3} key={book.id}> {/* 그리드 컬럼 사이즈 조정 */}
              <div className="grid-item">
                <img src={book.coverImage} alt={book.title} width="80" height="115" />
                <p>
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
            </Col>
          ))}
        </Row>
      </Container>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 0}>
          이전
        </button>
        {/* 중앙에 이전/다음 버튼 배치 */}
        <button onClick={nextPage} disabled={currentData.length < itemsPerPage} className="mx-2">
          다음
        </button>
      </div>
    </div>
  );
}

export default MainRanking;
