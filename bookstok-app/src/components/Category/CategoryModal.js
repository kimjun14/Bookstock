import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoryList from './CategoryList'; // CategoryList 컴포넌트를 임포트
import './CategoryModal.css'

const CategoryModal = ({ show, onHide }) => {
    return (
        <Modal style={{ background: 'rgba(0, 0, 0, 0.5)' }} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>도서 카테고리</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* CategoryList 컴포넌트를 사용하여 카테고리 목록을 표시 */}
                <CategoryList onCategoryClick={(category) => {
                    // 카테고리 클릭 시 실행할 로직을 여기에 추가
                    console.log(`선택한 카테고리: ${category}`);
                }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryModal;
