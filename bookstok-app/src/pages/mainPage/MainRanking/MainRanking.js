import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './MainRanking.css';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
});

function MainRanking() {
    const [bookData, setBookData] = useState([]);

    const rankBookFetcher = async () => {
        try {
            const response = await axiosConnect.get('test/mainpagetest2')
            setBookData(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        rankBookFetcher();
        console.log(bookData);;
    },[]);

   // 한 페이지에 표시할 아이템 개수 (6개)
   const itemsPerPage = bookData.length;

   // 슬라이더 설정 (2열, 각 열당 아이템3개)
   const settings = {
     dots: true,
     infinite: true,
     speed: 500,
     rows :2 ,
     slidesPerRow :3 
   };
  
 return (
     <div>
         <h2 className='rankingBookTitle'>실시간 인기 도서</h2>
         <Slider {...settings}>
           {bookData.slice(0, itemsPerPage).map((book,index)=>(
             <div key={book.id} className="book-slide">
               <Link to={`/trading?id=${book.auctionId}`} className="card-link"> 
                 <div className="card custom-card"> 
                   {/* 순위 뱃지 */}
                   <div className="rank-badge">{index +1}</div> 
                   {/* 이미지와 도서 정보 */}
                   <div className="row no-gutters">
                     <div className="col-md-4">
                       <img src={book.bookImgSrc} className="card-img" alt={book.bookTitle} />
                     </div>
                     <div className="col-md-8">
                       {/* 도서 제목과 저자 등 */}
                       <h5 className="card-title">{book.bookTitle}</h5>
                       {/* 추가적인 도서 정보 표시 */}
                     </div>
                   </div>
                 </div>
               </Link>
             </div>
           ))}
         </Slider>

         
     </ div >
 );
}

export default MainRanking;
