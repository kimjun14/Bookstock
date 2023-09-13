import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BookSearchResult() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: '어린왕자',
      coverImage: 'http://placeholder.com/50x70',
      price: '11,000',
      userId: '가을이',
      startDate: '2023-09-12',
      endDate: '2023-09-27',
      views: 10,
    }
  ]);

  return (
    <div>
      <h1>도서 검색 결과</h1>
      {/* 정렬 버튼 */}
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary">최신순</button>
        <button type="button" class="btn btn-primary">제목순</button>
        <button type="button" class="btn btn-primary">인기순</button>
      </div>
      {/* 검색 결과 표 */}
      <table className="searchTable">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">표지</th>
            <th scope="col">도서명</th>
            <th scope="col">가격</th>
            <th scope="col">등록자명</th>
            <th scope="col">등록일/마감일</th>
            <th scope="col">조회수</th>
            <th scope="col">관심등록</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {books.map((book) => (
            <tr key={book.id}>
              <th scope="row">{book.id}</th>
              <td><img src={book.coverImage} alt="" /></td>
              <td><Link to={`/book/${book.id}`}>{book.title}</Link></td>
              <td>{book.price}</td>
              <td><Link to={`/author/${book.author}`}>{book.userId}</Link></td>
              <td>{book.startDate} /<br />{book.endDate}</td>
              <td>{book.views}</td>
              <td>

                {/* 관심등록 버튼 */}
                <button>
                  <img
                    src="https://cheolsusee.com/img/es_img/btn_rows_scrap_add_05.png"
                    alt=""
                  />
                </button>
                0
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookSearchResult;
