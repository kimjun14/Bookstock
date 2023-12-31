import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const DepositModal = ({ openModal, closeModal, cash, selectedBank, account }) => {

  const navigate = useNavigate();

  const axiosConnect = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
    withCredentials: true
  });
  

  const handleConfirm = async () => {
    try {
      // cash 값에서 콤마 제거하고 정수로 변환
      const cashWithoutComma = cash.replace(/,/g, '');
      const cashValue = parseInt(cashWithoutComma, 10);

      const response = await axiosConnect.post('/point', {
        cash: cashValue,
        bank: selectedBank,
        account: account,
      });

      // 서버 응답에 따라 알림 또는 다른 작업 수행
      if (response.data.success) {
        alert('충전이 성공적으로 완료되었습니다.');
        closeModal();

        // 포인트 충전 성공 시 마이페이지로 이동
        navigate('/mypage');
      } else {
        alert('충전 중에 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error during confirm request:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal show={openModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>무통장 입급</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>충전금액은 {cash} 원 입니다</p>
        <p>선택하신 은행은 {selectedBank}</p>
        <p>{account}로 입금하세요.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          충전하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;