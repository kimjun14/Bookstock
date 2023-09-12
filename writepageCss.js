function writeCss() {
  return (
    <>
      {/* 부트스트랩 css 라이브러리 이용 */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossorigin="anonymous"
      />
      {/* 삽니다 팝니다 페이지 구현*/}
      <div className='container'>  
        {/* Header , to -> 네비게이션, 마이페이지 */}
        <div className='m-2 row d-flex align-items-start'>
          <div className='col-6'>
            <img className='m-1' src='http://via.placeholder.com/160x38' alt='img-logo' />
          </div>
          <div className='col-6 d-flex justify-content-end'>
            <img className='m-1' src='http://via.placeholder.com/90x36' alt='btn-logout'/>
            <img className='m-1' src='http://via.placeholder.com/100x36' alt='btn-mypage'/>
            <img className='m-1' src='http://via.placeholder.com/45x45' alt='img-nav' />
          </div>
        </div>
        {/* Body , 구매 폼 제공*/}
        <div className="row">
          <div className="row d-flex align-items-bottom">
            <div className="fs-5"><span className="fs-3">상품 등록  </span>삽니다 정보입력</div>
          </div>
          <div className="d-flex align-items-center bg-light mt-3">
            <ul className="pl-2 m-4">
              <li className="">상품등록을 위해 알아야 할</li>
              <li className="">주의사항 알려주는 곳</li>
            </ul>
          </div>
          {/* Body - step1 , 기본정보 입력 */}
          <div className="text-center fs-3 mt-3">기본 정보</div>
          <div className="row mt-3">
            <table>
              {/* 구현 목적으로 넣긴 했지만 책 검색 API에선 카테고리값을 반환하지 않아 쓰기 힘듬 */}
              <tr>
                <td className="col-3 p-2">카테고리</td>
                <td className="col-3"><select className="form-select">
                  <option value={1}>선택 1</option>
                  <option value={2}>선택 2</option>
                </select></td>
                <td className="col-3"><select className="form-select">
                </select></td>
                <td className="col-3"><select className="form-select"></select></td>
              </tr>
              <tr>
                <td className="col-2 p-2">책 제목</td>
                <td colSpan={2}><input className="w-100"></input></td>
              </tr>
              <tr>
                <td className="col-2 p-2">저자명</td>
                <td><input className="w-100"></input></td>
                <td className="col-2 p-2 ps-4">출판사명</td>
                <td><input className="w-100"></input></td>
              </tr>
              <tr>
                <td className="col-2 p-2">ISBN</td>
                <td><input className="w-100"></input></td>
                <td className="col-2 p-2 ps-4">출판일</td>
                <td><input className="w-100"></input></td>
              </tr>
              <tr>
                <td className="p-2">판매 상태</td>
                <td colSpan={2}>
                  <input className="form-check-input me-2" type="radio" checked />판매 중
                  <input className="form-check-input ms-4 me-2" type="radio" />판매 완료
                </td>
              </tr>
              <tr>
                <td className="col-2 p-2">판매 가격</td>
                <td><input className="w-100"></input></td>
                <td className="col-2 p-2 ps-4">연락처</td>
                <td><input className="w-100"></input></td>
              </tr>
            </table>
          </div>
          {/* Body - step2 , 사진 등록 */}
          <div className="text-center fs-3 mt-3">상품 사진 등록</div>
          <img src="http://via.placeholder.com/1200x400" alt="prodImg" />
          <div>
            <button>파일추가</button>
            <button>선택삭제</button>
          </div>
          {/* Body - step3 , 상세 설명 등록 */}
          <div className="text-center fs-3 mt-3">상세 설명</div>
          <textarea className="w-100" rows={10}></textarea>
          <ul>
              <li>상세 설명 텍스트를 넣어주세요</li>
          </ul>
          {/* Body , 경매 등록 */}
          <div className="d-flex justify-content-center">
            <button>이전 페이지로</button>
            <button>다시 쓰기</button>
            <button>정보등록완료</button>
          </div>
        </div>

        
        {/* Footer */}
        <div>
          <p>라리북스 사업자 등록번호 XXX 대표번호 YYY</p>
          <p>Copyright(c) ~~~ rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default writeCss;
