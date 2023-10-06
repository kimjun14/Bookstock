import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const axiosConnect = axios.create({
  baseURL: 'http://localhost:12345/api',
  withCredentials: true
});

function Buying(props) {
  const Nav=useNavigate();
  const handleSubmit = async (bid) => {
    console.log(bid);
    try{
      const res=await axiosConnect.patch(`/auctions/${bid.auctionId}`);
      console.log(res);
      console.log("통신 완료")
    }catch(err){
      console.log(err)
    }finally{
      console.log("함수 실행 완료")
      alert("거래가 완료 되었습니다 <- 수정예정")
    }
    Nav('/');
  }
  useEffect(()=>{
    console.log("mount",props)
  },[])

  

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
        <Button variant="primary" onClick={()=>handleSubmit(props.bid)} >
          구매하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Buying;
