import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const axiosConnect = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true
});

function Buying(props) {
  const Nav =useNavigate();
  const URLquery = useLocation();
  const queryParams = new URLSearchParams(URLquery.search);
  // {queryParams.get('id')} => auctionId

  const handleSubmit = async (bidId) => {
    try{
      const res=await axiosConnect.patch(`/auctions/${queryParams.get('id')}`,{bid:bidId});
      console.log(res);
      console.log("통신 완료")
    }catch(err){
      console.log(err)
    }finally{
      console.log("함수 실행 완료")
      alert("거래가 완료 되었습니다")
    }
    Nav('/mypage');
  }

  

  return (
    <Modal show={props.show} onHide={props.onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>즉시거래</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>이 상품을 해당 가격에 즉시 거래합니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={()=>handleSubmit(props.bid.bidId)} >
          구매하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Buying;
