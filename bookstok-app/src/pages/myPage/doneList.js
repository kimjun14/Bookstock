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

  const carriers = [
    {
        "International": "false",
        "Code": "04",
        "Name": "CJ대한통운"
    },
    {
        "International": "false",
        "Code": "05",
        "Name": "한진택배"
    },
    {
        "International": "false",
        "Code": "08",
        "Name": "롯데택배"
    },
    {
        "International": "false",
        "Code": "01",
        "Name": "우체국택배"
    },
    {
        "International": "false",
        "Code": "06",
        "Name": "로젠택배"
    },
    {
        "International": "false",
        "Code": "11",
        "Name": "일양로지스"
    },
    {
        "International": "true",
        "Code": "12",
        "Name": "EMS"
    },
    {
        "International": "true",
        "Code": "13",
        "Name": "DHL"
    },
    {
        "International": "false",
        "Code": "20",
        "Name": "한덱스"
    },
    {
        "International": "true",
        "Code": "21",
        "Name": "FedEx"
    },
    {
        "International": "true",
        "Code": "14",
        "Name": "UPS"
    },
    {
        "International": "true",
        "Code": "26",
        "Name": "USPS"
    },
    {
        "International": "false",
        "Code": "22",
        "Name": "대신택배"
    },
    {
        "International": "false",
        "Code": "23",
        "Name": "경동택배"
    },
    {
        "International": "false",
        "Code": "32",
        "Name": "합동택배"
    },
    {
        "International": "false",
        "Code": "46",
        "Name": "CU 편의점택배"
    },
    {
        "International": "false",
        "Code": "24",
        "Name": "GS Postbox 택배"
    },
  ];

  function findCarrierNameByCode(code) {
    // "Code" 넣으면 "Name" 반환해주는 코드
    const carrier = carriers.find(item => item.Code === code);

    // 일치하는 항목을 찾았다면, "Name" 값을 반환함
    if (carrier) {
      return carrier.Name;
    } else {
      // 모르는 코드명이나 입력이 잘못된 경우 그대로 반환함
      return code;
    }
  }

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
                <td>{findCarrierNameByCode(item.trackingCompany)}</td>
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
