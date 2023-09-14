import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './newIndex.css'

function BookSearchResult() {
  // eslint-disable-next-line
  const [books, setBooks] = useState([
    {
      id: 1,
      title: '어린왕자',
      coverImage: 'http://placeholder.com/50x70',
      startPrice: '11,000',
      updatePrice: '9,000',
      userId: '닉네임',
      startDate: '2023-09-12',
      endDate: '2023-09-27',
      views: 10,
      interest: 0
    }
  ]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>도서 검색 결과</h1>
      {/* 정렬 버튼 */}
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary">최신순</button>
        <button type="button" class="btn btn-primary">제목순</button>
        <button type="button" class="btn btn-primary">인기순</button>
      </div>
      {/* 검색 결과 표 */}
      <table className="searchTable">
        <thead style={{
          backgroundColor: '#f3f3f3'
        }}>
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
              <td>시작가: {book.startPrice}원
                <br />현재가: {book.updatePrice}원</td>
              <td><Link to={`/author/${book.author}`}>{book.userId}</Link></td>
              <td>{book.startDate} /<br />{book.endDate}</td>
              <td>{book.views}</td>
              <td>

                {/* 관심등록 버튼 */}
                <button className='interestBtn'>
                  <img
                    src="https://cheolsusee.com/img/es_img/btn_rows_scrap_add_05.png"
                    alt=""
                  />
                </button>
                {book.interest}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookSearchResult;
