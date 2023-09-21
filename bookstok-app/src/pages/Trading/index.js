import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css';
import axios from 'axios';
import moment from 'moment';
import Chat from './chat';

function Trading() {
    const navigation = useNavigate();
    const [bidData, setBidData] = useState({
        bidPrice: "",
        bidImgSrc: "",
        bidContext: ""
    });
    const [auctionData, setAuctionData] = useState([]);
    const [auctionBidData, setAuctionBidData] = useState([])
    // const [userName,setUserName]= useState([])
    const URLquery = useLocation();
    const queryParams = new URLSearchParams(URLquery.search);
    // location.search      =>  URL? query... 이후부분받음
    // URLSearchParams      =>  쿼리 문자열의 key, value 쌍을 생성자로 저장
    // {queryParams.get('id')} => auctionId 검색을 위해 던져 줄 거

    const fetchAuctionData = async () => {
        try {
            const response = await axios.get(`http://localhost:12345/api/auctions/${queryParams.get('id')}`)
            // console.log(response.data[0]);   // auctionData에 어떤 값이 들어가는지 확인하는 용도
            setAuctionData(response.data[0]);
        } catch (err) {
            console.error(err);
        }
    }

    const fetchBidData = async () => {
        try {
            const response = await axios.get(`http://localhost:12345/api/auctions/${queryParams.get('id')}/bids`)
            setAuctionBidData(response.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }
    
    // const getUserName = async ()=>{
    //     try{
    //         const response = await axios.get(`http://localhost:12345/getname`);
    //         setUserName(response);
    //         console.log(userName);
    //     }catch(err){
    //         console.error(err);
    //     }
    // }

    useEffect(() => {
        if (queryParams.get('id')) {          // id 쿼리의 값이 있으면 위의 fetchData 함수 실행
            fetchAuctionData();
            fetchBidData();
            // getUserName()
        }
        else {
            alert("잘못 된 접근입니다.");    // id쿼리 없이 들어가면 오류 메세지 나오고
            navigation('/');                // 홈('/')화면으로 보내버림 (추후 변경 할 수도)
        }
    },[]);     // 컴포넌트가 처음 마운트 되면 axios 통신을 하여 id값의 경매 데이터를 받아옴

    const handleBidChange = (e) => {
        setBidData({
            ...bidData,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        console.log(bidData);
    }, [bidData]);  //bidData가 변경 되었는지 확인하기위한 용도

    const handleBidSubmit = async () => {
        try {
            const response = await axios.post(`http://localhost:12345/api/auctions/${queryParams.get('id')}`, bidData)
            console.log(bidData, queryParams.get('id'), response);
        } catch (err) {
            console.error(err);
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

    return (
        <>
            <article>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="item">
                                <div className="itemImg">
                                    <img
                                        src={auctionData.bookImgSrc && auctionData.bookImgSrc}
                                        alt="bookImg"
                                        className="img-fluid" // 이미지 플루이드 반응형
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="itemInfo">
                                <h2>
                                    <span className="badge text-bg-dark">~~~삽니다~~~</span>
                                    <span className="itemTitle"> {auctionData.auctionTitle && auctionData.auctionTitle}</span>
                                </h2>

                                <p>{auctionData.bookTitle && auctionData.bookTitle}</p>
                                <p>작가: {auctionData.bookAuthor && auctionData.bookAuthor}</p>
                                <p>출판사: {auctionData.bookPub && auctionData.bookPub}</p>
                                <p>경매 시작가: {auctionData.auctionPrice && auctionData.auctionPrice}</p>
                                <p>판매상태: ~~~판매중~~~ </p>
                                <p>출판일 : {auctionData.bookPubDate && auctionData.bookPubDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card text-center">
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
                                            <h3 className="card-title col-sm-1 ms-4">{bid.uId}</h3>
                                            <p className="card-title col-sm-2">
                                                <small className="text-body-secondary">{formatBidCreateAt(bid.bidCreateAt)}</small>
                                            </p>
                                            <h6 className="card-title col-sm-1">{bid.bidPrice} 원</h6>
                                            <div className='col-sm-5'></div>
                                            <button type="button" className="btn btn-primary col-sm-1 mt-1">즉시구매</button>
                                            <button type="button" className="btn btn-info col-sm-1 mt-1" onClick={() => openChatPopUp(bid)}>1:1 채팅</button>
                                        </div>

                                        <div className='card-body row'>
                                            <div className="alert alert-light col-sm-12" role="alert">
                                                <img src="http://placeholder.com/70" className="img-fluid mx-4" alt="..." />
                                                {bid.bidContext ? bid.bidContext : "상세 설명이 없습니다."}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className="row">
                        <div className="form-floating">
                            <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name="bidContext" value={bidData.bidContext} onChange={handleBidChange} ></textarea>
                            <label htmlFor="floatingTextarea2" className='ms-1'>상품 정보를 입력하세요</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 offset-md-6">
                            <div className="input-group mt-2">
                                <input type="file" className="form-control" id="inputGroupFile04" name="bidImgSrc" onChange={null} accept='image/jpeg, image/jp, image/png'/>
                                <input type="text" className="form-control" placeholder="입찰금액을 입력하세요" name="bidPrice" value={bidData.bidPrice} onChange={handleBidChange} />
                                <button className="btn btn-success mt-0" type="button" id="inputGroupFileAddon04" onClick={null}>    
                                    이미지 업로드
                                </button>
                                <button className="btn btn-success mt-0" type="button" id="inputGroupFileAddon04" onClick={handleBidSubmit}>    
                                    입찰 하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Chat isOpen={chatPopUp} bid={selectBid} onClose={closeChatPopUp} />
            </article>
        </>
    );
}

export default Trading;
