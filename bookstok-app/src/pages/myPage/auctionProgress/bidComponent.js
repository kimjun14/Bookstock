import React, { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import { useMediaQuery } from 'react-responsive';
=======
import { Link } from 'react-router-dom';
import Chat from './chat';
import Buying from './buying';
>>>>>>> 3bc0069c5639db18c2fd7b26838f910c425e3b68

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
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
    return isMobile ? children : null
}


const AuctionProgressInfoComponent = () => {
<<<<<<< HEAD
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

    return (
        <>
            <Desktop>
                <div id="bid" className="mt-5 mb-3">
                    <h2>경매 입찰 내역</h2>
                </div>
                <div>
                    <div>
                        {Object.keys(myBidInfo).map(aId => (
                            <div className="card mt-3 p-3" key={aId}>
                                {/* 입찰한 책에대한 부분 */}
                                <h4> 경매 제목 : {myBidInfo[aId][0].auctionTitle}</h4>
                                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정 */}
                                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                                {myBidInfo[aId].map(bid => (
                                    <div key={bid.bidId}>
                                        <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                                            <div className="row g-0">
                                                <div className="col-md-12">
                                                    <div className="card-body row align-items-center">
                                                        <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                                                        <p className="card-title col-sm-2 mt-4">
                                                            <small className="text-body-secondary">{bid.bidCreateAt}</small>
                                                        </p>
                                                        <h6 className="card-title col-sm-2 mt-4">{bid.bidPrice} 원</h6>
                                                        <div className="col-sm-2"></div>
                                                        <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={null}>즉시구매</button>
                                                        <button type="button" className="btn btn-info col-sm-2 mt-3" onClick={() => null}>1:1 채팅</button>

                                                    </div>
                                                </div>

                                                <div className='card-body row'>
                                                    <div className="alert alert-light col-sm-12" role="alert">
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
                    </div>
                </div>
            </Desktop>
            
            <Mobile>
                <div id="bid" className="mt-5 mb-3">
                    <h2>경매 입찰 내역</h2>
                </div>
                <div>
                    <div>
                        {Object.keys(myBidInfo).map(aId => (
                            <div className="mt-3 p-3" key={aId}>
                                {/* 입찰한 책에대한 부분 */}
                                <h4> 경매 제목 : {myBidInfo[aId][0].auctionTitle}</h4>
                                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨<br />
                            없으면 API서버 mypage 모델 myAuctionBid 함수를 수정 */}
                                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                                {myBidInfo[aId].map(bid => (
                                    <div key={bid.bidId}>
                                        <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                                            <div className="row g-0">
                                                <div className="col-md-12">
                                                    <div className="card-body row align-items-center">
                                                        <h3 className="card-title col-sm-1 mt-4">{bid.nickname}</h3>
                                                        <p className="card-title col-sm-2 mt-1">
                                                            <small className="text-body-secondary">{bid.bidCreateAt}</small>
                                                        </p>
                                                        <h6 className="card-title col-sm-2 mt-1">{bid.bidPrice} 원</h6>
                                                        <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={null}>즉시구매</button>
                                                        <button type="button" className="btn btn-info col-sm-2 mt-1" onClick={() => null}>1:1 채팅</button>

                                                    </div>
                                                </div>

                                                <div className='card-body row ms-1'>
                                                    <div className="alert alert-light col-sm-12" role="alert">
                                                        <div className='row'>
                                                            <img src={bid.bidImgSrc ? "" : "http://placeholder.com/100"} className="img-fluid" alt="..." />
                                                        </div>
                                                        <div className='row justify-content-center mt-4'>
                                                            {bid.bidContext}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Mobile>
        </>
    );
=======
  const [myBidInfo, setMyBidInfo] = useState([]);
  // 1:1 채팅 모달 관련 상태
  const [chatPopUp, setChatPopUp] = useState(false);
  const [selectBid, setSelectBid] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 1:1 채팅 모달 열기
  const openChatPopUp = (bid) => {
    setSelectBid(bid);
    setChatPopUp(true);
  };

  const closeChatPopUp = () => {
    setSelectBid(null);
    setChatPopUp(false);
  };

  const openModal = (bid) => {
    setSelectBid(bid);
    setShowModal(true);
  }

  const closeModal = () => {
    setSelectBid(null);
    setShowModal(false);
  }
  

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

  return (
    <>
      <div id="bid" className="mt-5 mb-3">
        <h2>경매 입찰 내역</h2>
      </div>
      <div>
        <div>
          {Object.keys(myBidInfo).map(aId => (
            <div className="card mt-3 p-3" key={aId}>
              <Link to={`/trading?id=${myBidInfo[aId][0].auctionId}`}>
                {/* 입찰한 책에대한 부분 */}
                {/* 필요한 정보가 더 있다면 myBidInfo[aId][0].key값 쓰면 됨
                key 값은 auction tbl 참고 */}
                <div className="card mb-4">
                  <div className="card-body d-flex align-items-center">
                    <img src={myBidInfo[aId][0].bookImgSrc} alt={myBidInfo[aId][0].bookTitle} style={{ width: '100px' }} />
                    <h5 className="card-title">{myBidInfo[aId][0].bookTitle}</h5>
                    <p className="card-text">{myBidInfo[aId][0].auctionTitle}</p>
                    <p className="card-text">
                      <strong>시작가 </strong> {myBidInfo[aId][0].auctionPrice} 원
                    </p>
                  </div>
                </div>
                </Link>

                {/* 여러번 입찰 했다면 아래 메세지가 여러개 나옴 */}
                {myBidInfo[aId].map(bid => (
                  <div key={bid.bidId}>
                    <div className="card mb-3" style={{ minWidth: "25%" }} key={null}>
                      <div className="row g-0">
                        <div className="col-md-12">
                          <div className="card-body row align-items-center">
                            <h3 className="card-title col-sm-1 ms-4 mt-4">{bid.nickname}</h3>
                            <p className="card-title col-sm-2 mt-4">
                              <small className="text-body-secondary">{bid.bidCreateAt}</small>
                            </p>
                            <h6 className="card-title col-sm-2 mt-4">{bid.bidPrice} 원</h6>
                            <div className="col-sm-2"></div>
                            <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={() => {openModal(bid)}}>즉시구매</button>
                            <button type="button" className="btn btn-info col-sm-2 mt-3" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>

                          </div>
                        </div>

                        <div className='card-body row'>
                          <div className="alert alert-light col-sm-12" role="alert">
                            <img src={bid.bidImgSrc ? "" : "http://placeholder.com/100"} className="img-fluid mx-4" alt="..." />
                            {bid.bidContext}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
                <Buying show={showModal} bid={selectBid} onClose={closeModal} 
                onSave={() => {closeModal()}}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
>>>>>>> 3bc0069c5639db18c2fd7b26838f910c425e3b68
}

export default AuctionProgressInfoComponent;