import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './index.css';
import axios from 'axios';

function Trading() {
    const navigation = useNavigate();
    const [bidData, setBidData] = useState({
        bidPrice:"",
        bidImgSrc:"",
        bidContext:""
    });
    const [auctionData, setAuctionData] = useState([]);
    const [auctionBidData, setAuctionBidData] = useState([])
    const URLquery = useLocation();
    const queryParams = new URLSearchParams(URLquery.search);
    // location.search      =>  URL? query... 이후부분받음
    // URLSearchParams      =>  쿼리 문자열의 key, value 쌍을 생성자로 저장
    // {queryParams.get('id')} => auctionId 검색을 위해 던져 줄 거
    
    const fetchAuctionData = async () => {
        try{
            const response=await axios.get(`http://220.127.80.225:12345/api/auctions/${queryParams.get('id')}`)
            // console.log(response.data[0]);   // auctionData에 어떤 값이 들어가는지 확인하는 용도
            setAuctionData(response.data[0]);
        }catch(err){
            console.error(err);
        }
    }

    const fetchBidData = async () => {
        try{
            const response=await axios.get(`http://220.127.80.225:12345/api/auctions/${queryParams.get('id')}/bids`)
            setAuctionBidData(response.data);
            console.log(response.data);
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(()=>{
        if(queryParams.get('id')){          // id 쿼리의 값이 있으면 위의 fetchData 함수 실행
            fetchAuctionData();
            fetchBidData();
        }
        else{
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
        try{
            const response=await axios.post(`http://220.127.80.225:12345/api/auctions/${queryParams.get('id')}`,bidData)
            console.log(bidData,queryParams.get('id'),response);    
        }catch(err){
            console.error(err);
        }finally{
            fetchBidData();
        }
    }

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
                    <div className='d-flex flex'>
                        {auctionBidData.map((bid,index)=>(
                            <div className="card mb-3" style={{ minWidth: "25%" }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="..." className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{bid.bidPrice}</h5>
                                            <p className="card-text">{bid.bidContext}</p>
                                            <p className="card-text"><small className="text-body-secondary">{bid.bidCreated}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="form-floating">
                            <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name="bidContext" value={bidData.bidContext} onChange={handleBidChange} ></textarea>
                            <label htmlFor="floatingTextarea2">상품 정보를 입력하세요</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group mt-2">
                            <input type="file" className="form-control" id="inputGroupFile04" name="bidImgSrc" value={bidData.bidImgSrc} onChange={handleBidChange} />
                            <input type="text" className="form-control" placeholder="입찰금액을 입력하세요" name="bidPrice" value={bidData.bidPrice} onChange={handleBidChange} />
                            <button className="btn btn-success mt-0" type="button" id="inputGroupFileAddon04" onClick={handleBidSubmit}>
                                입찰 하기
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default Trading;
