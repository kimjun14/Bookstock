function write() {
  return (
    <>
      {/* 삽니다 팝니다 페이지 구현*/}
      <div className='container'>  
        {/* Header , to -> 네비게이션, 마이페이지 */}
        <div>
          <div id="headerRight">
            <img src='http://via.placeholder.com/160x38' alt='img-logo' />
          </div>
          <div id="headerLeft">
            <img src='http://via.placeholder.com/90x36' alt='btn-logout'/>
            <img src='http://via.placeholder.com/100x36' alt='btn-mypage'/>
            <img src='http://via.placeholder.com/45x45' alt='img-nav' />
          </div>
        </div>
        {/* Body , 구매 폼 제공*/}
        <div>
          <div>
            <h3>상품 등록 구매 정보입력</h3>
          </div>
          <div>
            <ul>
              <li>상품등록을 위해 알아야 할</li>
              <li>주의사항 알려주는 곳</li>
            </ul>
          </div>
          {/* Body - form - step1 , 기본정보 입력 */}

          <div>기본 정보</div>
          <div>
            <table>
              {/* 구현 목적으로 넣긴 했지만 책 검색 API에선 카테고리값을 반환하지 않아 쓰기 힘듬 */}
              <tr>
                <td>카테고리</td>
                <td><select>
                  <option value={1}>선택 1</option>
                  <option value={2}>선택 2</option>
                </select></td>
                <td><select>
                  <option value={1}>선택 1</option>
                </select></td>
                <td><select>
                  <option value={1}>선택 1</option>
                </select></td>
              </tr>
              <tr>
                <td>책 제목</td>
                <td colSpan={2}><input type="textarea"></input></td>
              </tr>
              <tr>
                <td>저자명</td>
                <td><input type="textarea"></input></td>
                <td>출판사명</td>
                <td><input type="textarea"></input></td>
              </tr>
              <tr>
                <td>ISBN</td>
                <td><input type="textarea"></input></td>
                <td >출판일</td>
                <td><input type="textarea"></input></td>
              </tr>
              <tr>
                <td>판매 상태</td>
                <td colSpan={2}>
                  <input type="radio" name="i" checked />판매 중
                  <input type="radio" name="i"/>판매 완료
                </td>
              </tr>
              <tr>
                <td>판매 가격</td>
                <td><input type="textarea"></input></td>
                <td>연락처</td>
                <td><input type="textarea"></input></td>
              </tr>
            </table>
          </div>
          {/* Body - step2 , 사진 등록 */}
          <div>상품 사진 등록</div>
          <img src="http://via.placeholder.com/1200x400" alt="prodImg" />
          <div>
            <button>파일추가</button>
            <button>선택삭제</button>
          </div>
          {/* Body - step3 , 상세 설명 등록 */}
          <div>상세 설명</div>
          <textarea rows={10} cols={50}></textarea>
          <ul>
              <li>상세 설명 텍스트를 넣어주세요</li>
          </ul>
          {/* Body , 경매 등록 */}
          <div>
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

export default write;
