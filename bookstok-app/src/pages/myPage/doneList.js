import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './index.css'
import axios from 'axios';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

const TradeDone = () => {
  const [fetchInfo,setFetchInfo]=useState([])

  const fecthdata = async () => {
    try {
        const result = await axiosConnect.get(`/trading/list/done`);
        console.log(result)
        setFetchInfo(result.data);
    } catch (err) {
        console.error(err);
    }
}

  useEffect(() => {
    fecthdata();
    console.log("경매 완료 페이지 마운트")
  }, []) // 마운트 되면 작동

/* 통신으로 받아오는 object들 설명
price - 낙찰가
role - buy면 역경매를 등록하고 책을 산 경우,
sell이면 이 경매건에서 판매(입찰)한사람

Addr, Addr2, AddrPostal - 주소 정보
tradingId, aId, buyerId, sellerId - 거래번호, 경매 넘버(책정보 조회), 구매자, 판매자 userNo 
trackingCompany, trackingNumber - 운송회사, 운송 번호
*/
  return (
    <>
      {fetchInfo.map((item, index) => (
        <div key={index}>
          <h2>{item.role === 'buy' ? '구매' : '판매'} 정보</h2>
          <p>거래 ID: {item.tradingId}</p>
          <p>가격: {item.price}</p>
          <p>주소: {item.Addr}, {item.Addr2}, {item.AddrPostal}</p>
          <p>운송장 번호: {item.trackingNumber}</p>
          <p>택배사: {item.trackingCompany}</p>
          <p>완료 여부: {item.Done ? '완료' : '진행 중'}</p>
          {/* 추가 정보 렌더링 가능 */}
        </div>
      ))}
    </>
  );
}

export default TradeDone;
