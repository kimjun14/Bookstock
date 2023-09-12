import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-section">
        <ul>
          <li>서비스</li>
          <li>제휴카드</li>
        </ul>
        <ul>
          <li>기타 문의</li>
          <li>콘텐츠 제공 문의</li>
          <li>사업 제휴 문의</li>
        </ul>
        <ul>
          <li>회사</li>
          <li>회사 소개</li>
          <li>인재채용</li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p style={{ fontWeight: 'bold' }}>라리북스(주) 사업자 정보</p>
        <div>
          <button>이용약관</button> |
          <button style={{ fontWeight: 'bold' }}>개인정보 처리방침</button> |
          <button>청소년보호정책</button> | <button>사업자정보확인</button>
        </div>
        <p>&copy; RARIBOOKS Corp.</p>
      </div>
    </footer>
  );
}

export default Footer;
