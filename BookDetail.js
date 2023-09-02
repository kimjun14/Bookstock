// import React from 'react';

function BookDetail() {
  return (
    <div className="Book-detail">
      {/* 헤더 */}
      <div className="header">
        <h1>북스탁</h1>
        <button>로그인</button>
        <button>회원가입</button>
      </div>

      {/* 바디 */}
      <h1>어린왕자</h1>
      <span className='category'>
        <a href='/'>상위 카테고리명</a>
        <a href='/'>하위 카테고리명</a>
      </span>
      <span className="register-interest">
        <a href='/'><img src='/' alt='허위신고하기' /></a>
      </span>
      <span className="register-interest">
        <a href='/'><img src='/' alt='관심회원등록' /></a>
      </span>
      {/* 설명 */}
      <img src='https://shopping-phinf.pstatic.net/main_3248542/32485425648.20221101113310.jpg?type=w300' alt='어린왕자 이미지'></img>
      <div className="Book-info">
        <div className="description">
          <span>팝니다</span>
          <h2>어린왕자 초반본(1943) 팝니다.</h2>
          <table>
            <tbody>
              <tr>
                <td>저자</td>
                <td>생텍쥐페리</td>
              </tr>
              <tr>
                <td>출판사</td>
                <td>더스토리</td>
              </tr>
              <tr>
                <td>판매상태</td>
                <td>판매중</td>
              </tr>
              <tr>
                <td>쪽수</td>
                <td>148쪽</td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td>9791159032462</td>
              </tr>
              <tr>
                <td>거래방법</td>
                <td>직거래/택배</td>
              </tr>
              <tr>
                <td>지역</td>
                <td>경기</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <span>상세설명</span>
          <span>| 상품과 관련하여 판매업체에서 직접 작성한 상세설명 입니다.</span>
          {/* <div>사용자가 작성한 설명을 가져와서 보여줌</div> */}
        </div>
        {/* 댓글 기능 구현해야함 */}
        <div className="comments">
          <h2>댓글</h2>
          <p>등록된 댓글이 없습니다.</p>
        </div>
      </div>
      {/* 하단 버튼 */}
      <button onClick={() => { }}>관심상품등록</button>
      <button onClick={() => { }}>목록보기</button>
      <button onClick={() => { }}>연관상품보기</button>

      {/* 푸터 */}
      <div className="footer">
        <div className="copyright">
          라리북스사업자등록번호 : 2023-09-03 대표번호 : 2000-1004
          <br />
          COPYRIGHT(C) 2023 라리북스 RIGHTS RESERVED.
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
