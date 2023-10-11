import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css';
import axios from 'axios';
import moment from 'moment';
import Chat from './chat';
import Buying from './buying';
import { Button, Col, FormControl, Row, InputGroup } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useNotification } from '../../contexts/NotificationContext';

// axios 통신에 기본 url을 포함시키고 Credentials 옵션을 붙여서 쿠키전송 가능하게 함
const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

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

function Trading() {
  const navigation = useNavigate();
  const [uploadStatus, setUploadStatus] = useState('initial');
  const [notifications, setNotifications] = useState([]);
  const { addNotification } = useNotification();
  const [bidData, setBidData] = useState({
    bidPrice: "",
    bidImgSrc: "",
    bidContext: ""
  });
  const [auctionData, setAuctionData] = useState([]);
  const [auctionBidData, setAuctionBidData] = useState([]);
  // const [userName,setUserName]= useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const URLquery = useLocation();
  const queryParams = new URLSearchParams(URLquery.search);
  // location.search      =>  URL? query... 이후부분받음
  // URLSearchParams      =>  쿼리 문자열의 key, value 쌍을 생성자로 저장
  // {queryParams.get('id')} => auctionId 검색을 위해 던져 줄 거

  const fetchAuctionData = async () => {
    try {
      const response = await axiosConnect.get(`/auctions/${queryParams.get('id')}`)
      // console.log(response.data[0]);   // auctionData에 어떤 값이 들어가는지 확인하는 용도
      console.log("Fetched auction data:", response.data[0]); // 가져온 데이터를 로그로 출력
      setAuctionData(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchBidData = async () => {
    try {
      const response = await axiosConnect.get(`/auctions/${queryParams.get('id')}/bids`)
      console.log("Fetched bid data:", response.data); // 가져온 데이터를 로그로 출력
      setAuctionBidData(response.data);
      console.log(response.data);

      // 알림을 초기화
      setNotifications([]);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (queryParams.get('id')) {          // id 쿼리의 값이 있으면 위의 fetchData 함수 실행
      fetchAuctionData();
      fetchBidData();
    }
    else {
      alert("잘못 된 접근입니다.");    // id쿼리 없이 들어가면 오류 메세지 나오고
      navigation('/');                // 홈('/')화면으로 보내버림 (추후 변경 할 수도)
    }
  }, []);     // 컴포넌트가 처음 마운트 되면 axios 통신을 하여 id값의 경매 데이터를 받아옴

  useEffect(() => {
    console.log("Auction data state:", auctionData);
    console.log("Bid data state:", auctionBidData);
  }, [auctionData, auctionBidData]);

  const handleBidChange = (e) => {
    setBidData({
      ...bidData,
      [e.target.name]: e.target.value
    });
  }

  const handleBidPriceChange = (e) => {
    // 입력된 값이 콤마가 포함된 숫자인지 확인
    const newValue = e.target.value.replace(/[^0-9,]/g, '');

    // 콤마로 값 나누기
    const parts = newValue.split(',');

    // 콤마 없이 값을 합쳐서 단일 문자열로 만들기
    const joinedValue = parts.join('');

    // 세 자리마다 콤마 추가
    const formattedValue = joinedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // bidData 상태 업데이트
    setBidData({
      ...bidData,
      [e.target.name]: formattedValue
    });
  }


  const handleBidSubmit = async () => {
    try {
      // 컴마 제거 및 숫자로 변환
      const bidPriceWithoutComma = bidData.bidPrice.replace(/,/g, '');
      const numericBidPrice = parseInt(bidPriceWithoutComma);

      // bidData 업데이트
      const updatedBidData = {
        ...bidData,
        bidPrice: numericBidPrice,
      };
      console.log("Bid data before submission:", updatedBidData);
      await axiosConnect.post(`/auctions/${queryParams.get('id')}`, updatedBidData)
      window.alert("입찰 등록에 성공하였습니다.")
      console.log("Bid submission successful!");

      // fetchBidData가 완료된 후에 알림을 추가
      await fetchBidData();

      // 새로운 입찰이 등록되었음을 알림 컴포넌트에 전달
      const newBidNotification = {
        message: `새로운 판매자 입찰이 등록되었습니다.`,
        type: 'success',
        price: bidData.bidPrice,
        details: bidData.bidContext,
        // sellerId: getSellerIdForBid(),
      };
      addNotification(newBidNotification);

    } catch (err) {
      console.error("Error submitting bid:", err);
    } finally {
      fetchBidData();
    }
  }

  const formatBidCreateAt = (dateString) => {
    const formattedDate = moment(dateString).format('YYYY-MM-DD HH:mm:ss');
    return formattedDate;
  }

  // 1:1 채팅 모달 관련 상태
  const [chatPopUp, setChatPopUp] = useState(false);
  const [selectBid, setSelectBid] = useState(null);

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

  // 이미지 선택 상태 변경
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // 이미지 업로드 핸들러
  const handleUpload = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      try {
        const response = await axiosConnect.post('/upload', formData);

        if (response.status === 200) {
          console.log(response.data.bidImgSrc)
          setBidData({
            ...bidData,
            bidImgSrc: `http://localhost:12345/images/bidimg/${response.data.bidImgSrc}`
          })
          console.log(bidData)
          console.log('Image uploaded successfully');
          alert("이미지 업로드가 완료 되었습니다.")

          // 이미지 업로드 성공 메시지 설정
          setUploadStatus('success');
        } else {
          console.error('Image upload failed');
          setUploadStatus('error');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploadStatus('error');
      } finally {
        console.log(bidData)
      }
    } else {
      console.error('No image selected');
      setUploadStatus('error');
    }
  };

  return (
    <>
      <Desktop>
        <article>
          <div className="tradingContainer">
            <div className="row itemInfo-container" style={{ marginTop: '1.5rem' }}>
              <div className="col d-flex justify-content-center">
                <img
                  src={auctionData.bookImgSrc && auctionData.bookImgSrc}
                  alt="bookImg"
                  className="img-fluid" // 이미지 플루이드 반응형
                  style={{ width: "40%", marginLeft: '10%', marginBottom: '2rem' }}
                />
              </div>
              <div className="col">
                <div className="itemInfo" style={{ width: "80%" }}>
                  {/* <span className="badge text-bg-dark fs-2 mt-3">삽니다</span> */}
                  <span className="tradingTitle fs-2"> {auctionData.auctionTitle && auctionData.auctionTitle}</span>
                  <hr />

                  <ul className="list-group list-group-flush mt-5">
                    <li className="list-group-item mb-1"><span class="badge" style={{ marginRight: '0.5rem' }}>제목</span>
                      {auctionData.bookTitle && auctionData.bookTitle}</li>
                    <li className="list-group-item mb-1"><span class="badge" style={{ marginRight: '0.5rem' }}>작가</span> {auctionData.bookAuthor && auctionData.bookAuthor}</li>
                    <li className="list-group-item mb-1"><span class="badge" style={{ marginRight: '0.5rem' }}>출판사</span> {auctionData.bookPub && auctionData.bookPub}</li>
                    <li className="list-group-item mb-1"><span class="badge" style={{ marginRight: '0.5rem' }}>출판일</span> {auctionData.bookPubDate && auctionData.bookPubDate}</li>
                    <li className="list-group-item mb-1"><span class="badge" style={{ marginRight: '0.5rem' }}>시작가</span> {auctionData.auctionPrice && auctionData.auctionPrice.toLocaleString()}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="detail-card-container card text-center mt-5">
              <div className="card-header">
                <b>상세설명</b>
              </div>
              <div className="card-body">
                <p className="card-text">{auctionData.auctionContext && auctionData.auctionContext}</p>
              </div>
            </div>

            <div id="bid" className="mt-5 mb-3">
            </div>
            <div>
              {auctionBidData.map((bid) => (
                <div className="bid-container card mb-3" style={{ minWidth: "25%" }} key={bid.id}>
                  <div className="row g-0">
                    <div className="col-md-12">
                      <div className="card-body row align-items-center">
                        <h6 className="card-title col-sm-1 ms-5 mt-4">{bid.nickname}</h6>
                        <p className="card-title col-sm-2 ms-2 mt-4">
                          <small className="text-body-secondary">{formatBidCreateAt(bid.bidCreateAt)}</small>
                        </p>
                        <h6 className="card-title col-sm-2 mt-4">{Number(bid.bidprice).toLocaleString()} 원</h6>
                        <div className="col-sm-2"></div>
                        <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={() => openModal(bid)}>즉시구매</button>
                        <button type="button" className="btn btn-info col-sm-2 mt-3 ms-2" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>

                      </div>
                    </div>

                    <div className='card-body row'>
                      <div className="alert alert-light col-sm-12" role="alert">
                        <img src={bid.bidImgSrc} className="img-fluid mx-4" alt="..." style={{ width: "18%" }} />
                        {bid.bidContext ? bid.bidContext : "상세 설명이 없습니다."}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="itemExplain row">
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name="bidContext" value={bidData.bidContext} onChange={handleBidChange} ></textarea>
                <label htmlFor="floatingTextarea2" className='ms-2'>구매자에게 하고 싶은 말을 입력하세요</label>
              </div>
            </div>
            <Row className='bidCreateContainer'>
              <Col className='d-flex'>
                <InputGroup className='mt-2'>
                  <FormControl
                    type="file"
                    onChange={handleImageChange}
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                  <Button className='uploadBtn' onClick={handleUpload}>
                    업로드
                  </Button>
                </InputGroup>


              </Col>

              <Col>
                <InputGroup className='mt-2'>
                  <FormControl
                    type="text"
                    placeholder="입찰금액을 입력하세요"
                    name="bidPrice"
                    value={bidData.bidPrice}
                    onChange={handleBidPriceChange}

                  />
                  <Button className='bidBtn' onClick={handleBidSubmit}>
                    입찰 하기
                  </Button>
                </InputGroup>
              </Col>
              {/* // 초기 상태 메시지 표시 */}
              {uploadStatus === 'initial' && (
                <p style={{ color: 'red' }}>📕 도서 이미지를 선택하고 업로드 버튼을 눌러주세요.</p>
              )}

              {/*  이미지 업로드 상태에 따른 메시지 표시 */}
              {uploadStatus === 'success' && (
                <p style={{ color: 'green' }}>✅ 도서 이미지 등록이 완료되었습니다. 금액을 입력하고 입찰하기 버튼을 눌러주세요.</p>
              )}

              {uploadStatus === 'error' && (
                <p style={{ color: 'red' }}>✋🏻 도서 이미지를 다시 업로드하세요.</p>
              )}
            </Row>

            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
            <Buying show={showModal} bid={selectBid} onClose={closeModal} onSave={() => {
              closeModal();
            }}
            />
          </div >
        </article >
      </Desktop>

      <Tablet>
        <article>
          <div className="container-fluid">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <img
                  src={auctionData.bookImgSrc && auctionData.bookImgSrc}
                  alt="bookImg"
                  className="img-fluid" // 이미지 플루이드 반응형
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col">
                <div className="itemInfo" style={{ width: "100%" }}>
                  <span className="badge text-bg-dark fs-2 mt-3">삽니다</span>
                  <span className="itemTitle fs-2"> {auctionData.auctionTitle && auctionData.auctionTitle}</span>
                  <hr />

                  <ul className="list-group list-group-flush mt-5">
                    <li className="list-group-item">책제목: {auctionData.bookTitle && auctionData.bookTitle}</li>
                    <li className="list-group-item">작가: {auctionData.bookAuthor && auctionData.bookAuthor}</li>
                    <li className="list-group-item">출판사: {auctionData.bookPub && auctionData.bookPub}</li>
                    <li className="list-group-item">경매 시작가: {auctionData.auctionPrice && auctionData.auctionPrice.toLocaleString()}</li>
                    <li className="list-group-item">출판일 : {auctionData.bookPubDate && auctionData.bookPubDate}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card text-center mt-5">
              <div className="card-header">
                상세설명
              </div>
              <div className="card-body">
                <p className="card-text">{auctionData.auctionContext && auctionData.auctionContext}</p>
              </div>
            </div>

            <div id="bid" className="mt-5 mb-3">
              <h2>역경매 입찰</h2>
            </div>
            <div>
              {auctionBidData.map((bid) => (
                <div className="card mb-3" style={{ minWidth: "25%" }} key={bid.id}>
                  <div className="row g-0">
                    <div className="col-md-12">
                      <div className="card-body row align-items-center">
                        <h3 className="card-title col ms-4 mt-4">{bid.nickname}</h3>
                        <p className="card-title col mt-4">
                          <small className="text-body-secondary">{formatBidCreateAt(bid.bidCreateAt)}</small>
                        </p>
                        <h6 className="card-title col mt-4">{Number(bid.bidprice).toLocaleString()} 원</h6>
                        <button type="button" className="btn btn-primary col-sm-2 mt-3" onClick={() => openModal(bid)}>즉시구매</button>
                        <button type="button" className="btn btn-info col-sm-2 mt-3 ms-2 me-4" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>
                      </div>
                    </div>

                    <div className='card-body row'>
                      <div className="alert alert-light col-sm-12" role="alert">
                        <img src={bid.bidImgSrc} className="img-fluid mx-4" alt="..." style={{ width: "30%" }} />
                        {bid.bidContext ? bid.bidContext : "상세 설명이 없습니다."}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="row">
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name="bidContext" value={bidData.bidContext} onChange={handleBidChange} ></textarea>
                <label htmlFor="floatingTextarea2" className='ms-2'>상품 정보를 입력하세요</label>
              </div>
            </div>
            <Row>
              <Col className='d-flex'>
                <InputGroup className='mt-2'>
                  <FormControl
                    type="file"
                    onChange={handleImageChange}
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"

                  />
                  <Button className='uploadBtn' onClick={handleUpload}>
                    업로드
                  </Button>
                </InputGroup>
              </Col>

              <Col>
                <InputGroup className='mt-2'>
                  <FormControl
                    type="text"
                    placeholder="입찰금액을 입력하세요"
                    name="bidPrice"
                    value={bidData.bidPrice}
                    onChange={handleBidPriceChange}

                  />
                  <Button className='bidBtn' onClick={handleBidSubmit}>
                    입찰 하기
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            {/* // 초기 상태 메시지 표시 */}
            {uploadStatus === 'initial' && (
              <p style={{ color: 'red' }}>📕 도서 이미지를 선택하고 업로드 버튼을 눌러주세요.</p>
            )}

            {/*  이미지 업로드 상태에 따른 메시지 표시 */}
            {uploadStatus === 'success' && (
              <p style={{ color: 'green' }}>✅ 도서 이미지 등록이 완료되었습니다. 금액을 입력하고 입찰하기 버튼을 눌러주세요.</p>
            )}

            {uploadStatus === 'error' && (
              <p style={{ color: 'red' }}>✋🏻 도서 이미지를 다시 업로드하세요.</p>
            )}

            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
            <Buying show={showModal} bid={selectBid} onClose={closeModal} onSave={() => {
              closeModal();
            }}
            />
          </div >
        </article >
      </Tablet>

      <Mobile>
        <article>
          <div className="container-fluid">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <img
                  src={auctionData.bookImgSrc && auctionData.bookImgSrc}
                  alt="bookImg"
                  className="img-fluid" // 이미지 플루이드 반응형
                  style={{ width: "50%" }}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="itemInfo" style={{ width: "80%" }}>
                <span className="badge text-bg-dark fs-2 mt-5">삽니다</span>
                <span className="itemTitle fs-2"> {auctionData.auctionTitle && auctionData.auctionTitle}</span>
                <hr />

                <ul className="list-group list-group-flush text-center mt-5">
                  <li className="list-group-item">책제목: {auctionData.bookTitle && auctionData.bookTitle}</li>
                  <li className="list-group-item">작가: {auctionData.bookAuthor && auctionData.bookAuthor}</li>
                  <li className="list-group-item">출판사: {auctionData.bookPub && auctionData.bookPub}</li>
                  <li className="list-group-item">경매 시작가: {auctionData.auctionPrice && auctionData.auctionPrice.toLocaleString()}</li>
                  <li className="list-group-item">출판일 : {auctionData.bookPubDate && auctionData.bookPubDate}</li>
                </ul>
              </div>
            </div>

            <div className="card text-center mt-5">
              <div className="card-header">
                상세설명
              </div>
              <div className="card-body">
                <p className="card-text">{auctionData.auctionContext && auctionData.auctionContext}</p>
              </div>
            </div>

            <div id="bid" className="mt-5 mb-1">
              <h2>역경매 입찰</h2>
            </div>
            <div>
              {auctionBidData.map((bid) => (
                <div className="card mb-3" style={{ minWidth: "25%" }} key={bid.id}>
                  <div className="row g-0">
                    <div className="col-md-12">
                      <div className="card-body row align-items-center text-center">
                        <h3 className="card-title col-sm-1 mt-4">{bid.nickname}</h3>
                        <p className="card-title col-sm-2 mt-1">
                          <small className="text-body-secondary">{formatBidCreateAt(bid.bidCreateAt)}</small>
                        </p>
                        <h6 className="card-title col-sm-2 mt-2">{Number(bid.bidprice).toLocaleString()} 원</h6>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>

                    <div className='card-body'>
                      <div className="row justify-content-center alert alert-light" role="alert">
                        <img src={bid.bidImgSrc} className="img-fluid" alt="..." style={{ width: "50%" }} />
                      </div>
                      <div className='text-center'>
                        {bid.bidContext ? bid.bidContext : "상세 설명이 없습니다."}
                      </div>
                    </div>

                    <div className='row justify-content-center'>
                      <button type="button" className=" btn btn-primary mt-1 ms-4" onClick={() => openModal(bid)} style={{ width: "80%" }}>즉시구매</button>
                      <button type="button" className="btn btn-info mt-2 ms-4 mb-3" onClick={() => openChatPopUp(bid)} style={{ width: "80%" }}>1:1 채팅</button>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className="row">
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name="bidContext" value={bidData.bidContext} onChange={handleBidChange} ></textarea>
                <label htmlFor="floatingTextarea2" className='ms-2'>상품 정보를 입력하세요</label>
              </div>
            </div>
            <Row>
              <InputGroup className='mt-4'>
                <FormControl
                  type="file"
                  onChange={handleImageChange}
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  style={{ marginBottom: "0" }}
                />
                <Button className='uploadBtn' onClick={handleUpload}>
                  업로드
                </Button>
              </InputGroup>
              {/* // 초기 상태 메시지 표시 */}
              {uploadStatus === 'initial' && (
                <p style={{ color: 'red', marginTop: '0' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg> 가지고 있는 도서를 촬영 후 이미지를 업로드해 주세요.</p>
              )}

              {/*  이미지 업로드 상태에 따른 메시지 표시 */}
              {uploadStatus === 'success' && (
                <p style={{ color: 'green', marginTop: '0' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg> 도서 이미지 등록이 완료되었습니다. 금액을 입력하고 입찰하기 버튼을 눌러주세요.</p>
              )}

              {uploadStatus === 'error' && (
                <p style={{ color: 'red', marginTop: '0' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg> 도서 이미지를 다시 업로드하세요.</p>
              )}
            </Row>

            <Row>
              <InputGroup>
                <FormControl
                  type="text"
                  placeholder="입찰금액을 입력하세요"
                  name="bidPrice"
                  value={bidData.bidPrice}
                  onChange={handleBidPriceChange}
                />
                <Button className='bidBtn' onClick={handleBidSubmit}>
                  입찰 하기
                </Button>
              </InputGroup>
            </Row>
            <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
            <Buying show={showModal} bid={selectBid} onClose={closeModal} onSave={() => {
              closeModal();
            }}
            />
          </div >
        </article >
      </Mobile>
    </>
  );
}

export default Trading;
