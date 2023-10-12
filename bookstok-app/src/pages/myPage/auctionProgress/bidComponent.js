import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import './bidComponent.css'
import moment from 'moment';
import Chat from './chat';


const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function groupByAId(data) {
  return data.reduce((acc, item) => {
    if (!acc[item.aId]) {
      acc[item.aId] = [];
    }
    acc[item.aId].push(item);
    return acc;
  }, {});
}

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
  return isMobile ? children : null
}

const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 })
  return isTablet ? children : null
}


const AuctionProgressInfoComponent = () => {
  // 1:1 채팅 모달 관련 상태
  const [chatPopUp, setChatPopUp] = useState(false);
  const [selectBid, setSelectBid] = useState(null);

  const [myBidInfo, setMyBidInfo] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axiosConnect.get(`/mypage/auctionbid`)
      if (response.data) {
        setMyBidInfo(groupByAId(response.data));
      }
    } catch (err) {
      console.error(err);
    }
    console.log(myBidInfo)
  }

  useEffect(() => {
    fetchData()
  }, []);

  // 1:1 채팅 모달 열기
  const openChatPopUp = (bid) => {
    console.log(bid);
    setSelectBid(bid);
    setChatPopUp(true);
  };

  const closeChatPopUp = () => {
    setSelectBid(null);
    setChatPopUp(false);
  };

  const AuctionCreateAt = (dateString) => {
    const Date = moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    return Date;
  }

  return (
    <>
      <Desktop>
        <div id="bid" className="mt-5 mb-3">
        </div>
        <div>
          <div>
            {Object.keys(myBidInfo).map(aId => (
              <div className="card bid-container" key={aId}>
                {/* 입찰한 책에대한 부분 */}
                <h4>{myBidInfo[aId][0].auctionTitle}</h4>
                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정 */}
                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                {myBidInfo[aId].map(bid => (
                  <div key={bid.bidId}>
                    <div className="card mb-3 card-bid-container" style={{ minWidth: "25%" }} key={null}>
                      <div className="row g-0">
                        <div className="col-md-12">
                          <div className="card-body row align-items-center">
                            <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                            <p className="card-title col-sm-2 mt-4">
                              <small className="text-body-secondary">{AuctionCreateAt(bid.bidCreateAt)}</small>
                            </p>
                            <h6 className="card-title col-sm-2 mt-4">{Number(bid.bidprice).toLocaleString()} 원</h6>
                            <div className="col-sm-2"></div>
                            <button type="button" className="btn btn-info col-sm-2 bidChatBtn" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>
                          </div>
                        </div>

                        <div className='card-body row card-textBox'>
                          <div className="alert alert-light col-sm-12 card-textBoxIn" role="alert">
                            <img src={bid.bidImgSrc ? "" : "http://placeholder.com/100"} className="img-fluid mx-4" alt="..." />
                            {bid.bidContext}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            ))}
            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
          </div>
        </div>
      </Desktop>

      <Tablet>
        <div id="bid" className="mt-5 mb-3">
        </div>
        <div>
          <div>
            {Object.keys(myBidInfo).map(aId => (
              <div className="card bid-container" key={aId}>
                {/* 입찰한 책에대한 부분 */}
                <h4>{myBidInfo[aId][0].auctionTitle}</h4>
                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정 */}
                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                {myBidInfo[aId].map(bid => (
                  <div key={bid.bidId}>
                    <div className="card mb-3 card-bid-container" style={{ minWidth: "25%" }} key={null}>
                      <div className="row g-0">
                        <div className="col-md-12">
                          <div className="card-body row align-items-center">
                            <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                            <p className="card-title col-sm-2 mt-4">
                              <small className="text-body-secondary">{bid.bidCreateAt}</small>
                            </p>
                            <h6 className="card-title col-sm-2 mt-4">{bid.bidPrice} 원</h6>
                            <div className="col-sm-2"></div>

                            <button type="button" className="btn btn-info col-sm-2 bidChatBtn" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>
                          </div>
                        </div>

                        <div className='card-body row card-textBox'>
                          <div className="alert alert-light col-sm-12 card-textBoxIn" role="alert">
                            <img src={bid.bidImgSrc ? "" : "http://placeholder.com/100"} className="img-fluid mx-4" alt="..." />
                            {bid.bidContext}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
          </div>
        </div>
      </Tablet>

      <Mobile>
        <div id="bid" className="mt-5 mb-3">
        </div>
        <div>
          <div>
            {Object.keys(myBidInfo).map(aId => (
              <div className="card bid-container" key={aId}>
                {/* 입찰한 책에대한 부분 */}
                <h4>{myBidInfo[aId][0].auctionTitle}</h4>
                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정 */}
                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                {myBidInfo[aId].map(bid => (
                  <div key={bid.bidId}>
                    <div className="card mb-3 card-bid-container" style={{ minWidth: "25%" }} key={null}>
                      <div className="row g-0">
                        <div className="col-md-12">
                          <div className="card-body row align-items-center">
                            <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                            <p className="card-title col-sm-2 mt-4">
                              <small className="text-body-secondary">{bid.bidCreateAt}</small>
                            </p>
                            <h6 className="card-title col-sm-2 mt-4">{bid.bidPrice} 원</h6>
                            <div className="col-sm-2"></div>

                            <button type="button" className="btn btn-info col-sm-2 bidChatBtn" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>
                          </div>
                        </div>

                        <div className='card-body row card-textBox'>
                          <div className="alert alert-light col-sm-12 card-textBoxIn" role="alert">
                            <img src={bid.bidImgSrc ? "" : "http://placeholder.com/100"} className="img-fluid mx-4" alt="..." />
                            {bid.bidContext}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
          </div>
        </div>
      </Mobile>
    </>
  );
}

export default AuctionProgressInfoComponent;