import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            
        }catch(err){
            console.error(err);
        }
        console.log(myAuctionInfo)
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

                </div>
            </div>
        </>
    );
}

export default AuctionProgressInfoComponent;