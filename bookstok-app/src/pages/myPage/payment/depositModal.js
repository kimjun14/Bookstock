import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const DepositModal = ({ openModal, closeModal, cash, selectedBank, account }) => {

  const axiosConnect = axios.create({
    baseURL: 'http://localhost:12345/api',
    withCredentials: true
  });

  const handleConfirm = async () => {
    try {
      const response = await axiosConnect.post('/point', {
        cash: parseInt(cash, 10),  // 문자열을 정수로 변환
        bank: selectedBank,
        account: account,
      });

      // 서버 응답에 따라 알림 또는 다른 작업 수행
      if (response.data.success) {
        alert('충전이 성공적으로 완료되었습니다.');
        closeModal();
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