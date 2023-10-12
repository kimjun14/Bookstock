import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import './doneList.css'

const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true,
});

const TradeDone = () => {
  const [fetchInfo, setFetchInfo] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axiosConnect.get('/trading/list/done');
      console.log(result);
      setFetchInfo(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    console.log('경매 완료 페이지 마운트');
  }, []);

  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 });

  return (
    <div className="trade-done">
      {/* Desktop View */}
      {isDesktop && (
        <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>거래 유형</th>
              <th>거래 ID</th>
              <th>가격</th>
              <th>주소</th>
              <th>운송장 번호</th>
              <th>택배사</th>
              <th>완료 여부</th>
            </tr>
          </thead>
          <tbody>
            {fetchInfo.map((item, index) => (
              <tr key={index}>
                <td>{item.role === 'buy' ? '구매 완료' : '판매 완료'}</td>
                <td>{item.tradingId}</td>
                <td>{item.price}</td>
                <td>{item.Addr}, {item.Addr2}, {item.AddrPostal}</td>
                <td>{item.trackingNumber}</td>
                <td>{item.trackingCompany}</td>
                <td>{item.Done ? '완료' : '진행 중'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Tablet View */}
      {isTablet && (
        <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>거래 유형</th>
            <th>거래 ID</th>
            <th>가격</th>
            <th>주소</th>
            <th>운송장 번호</th>
            <th>택배사</th>
            <th>완료 여부</th>
          </tr>
        </thead>
        <tbody>
          {fetchInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.role === 'buy' ? '구매 완료' : '판매 완료'}</td>
              <td>{item.tradingId}</td>
              <td>{item.price}</td>
              <td>{item.Addr}, {item.Addr2}, {item.AddrPostal}</td>
              <td>{item.trackingNumber}</td>
              <td>{item.trackingCompany}</td>
              <td>{item.Done ? '완료' : '진행 중'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {/* Mobile View */}
      {isMobile && (
        <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th>거래 유형</th>
            <th>거래 ID</th>
            <th>가격</th>
            <th>주소</th>
            <th>운송장 번호</th>
            <th>택배사</th>
            <th>완료 여부</th>
          </tr>
        </thead>
        <tbody>
          {fetchInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.role === 'buy' ? '구매 완료' : '판매 완료'}</td>
              <td>{item.tradingId}</td>
              <td>{item.price}</td>
              <td>{item.Addr}, {item.Addr2}, {item.AddrPostal}</td>
              <td>{item.trackingNumber}</td>
              <td>{item.trackingCompany}</td>
              <td>{item.Done ? '완료' : '진행 중'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default TradeDone;
