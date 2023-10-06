import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});


const AuctionProgressInfoComponent = () => {
    const [myAuctionInfo,setMyAuctionInfo] = useState([]);
    const fetchData = async () => {
        try{
            const response=await axiosConnect.get(`/mypage/auction`)
            setMyAuctionInfo(response.data);
            console.log(myAuctionInfo,response)
        }catch(err){
            console.error(err);
        }
    }
    
    useEffect(()=>{
        fetchData()
    },[]);
    
    return (
        <>
            <div id="bid" className="mt-5 mb-3">
                <h2>경매 등록 내역</h2>
            </div>
            <div>
                <div>
                    {myAuctionInfo.map((auction, index) => (
                        
                        <div key={auction.auctionId} class="container text-center">
                            <Link to={`/trading?id=${auction.auctionId}`}>
                            <div className="card mb-4">
                            <div className="card-body d-flex align-items-center">
                                <img src={auction.bookImgSrc} alt={auction.bookTitle} style={{ width: '100px' }} />
                              <h5 className="card-title">{auction.auctionTitle}</h5>
                              <p className="card-text">{auction.auctionContext}</p>
                              <p className="card-text">
                                <strong>Price:</strong> {auction.auctionPrice}
                              </p>
                              <p className="card-text">
                                <strong>Date:</strong> {new Date(auction.auctionStart).toLocaleDateString()}
                              </p>
                            </div>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item">
                                <strong>Book Title:</strong> {auction.bookTitle}
                              </li>
                              <li className="list-group-item">
                                <strong>Publisher:</strong> {auction.bookPub}
                              </li>
                            </ul>
                          </div>
                          </Link>
                        </div>
                        
                    ))}
                </div>
            </div>
        </>
    );
}

export default AuctionProgressInfoComponent;