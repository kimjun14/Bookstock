import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Buying(props) {
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
        <Link to="/buyingSuccess">
          <Button variant="primary" onClick={props.onSave} >
            구매하기
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default Buying;
