import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const DepositModal = ({ openModal, closeModal, cash, selectedBank, account }) => {
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
      </Modal.Footer>
    </Modal>
  );
};

export default DepositModal;
