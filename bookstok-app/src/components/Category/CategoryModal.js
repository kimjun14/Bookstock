import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CategoryList from './CategoryList'; 
import './CategoryModal.css'

const CategoryModal = ({ show, onHide, onCategorySelect, selectedCategory }) => {
    return (
        <>
        <Modal style={{ background: 'rgba(0, 0, 0, 0.5)' }} show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>도서 카테고리</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryList onCategoryClick={(category) => {
                    console.log(`선택한 카테고리: ${category}`);
                    onCategorySelect(category); // 선택한 카테고리를 부모 컴포넌트로 전달
                }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    닫기
                </Button>
            </Modal.Footer>
            {selectedCategory && ( // 선택한 카테고리가 있는 경우에만 표시
                <div>
                    <p>선택된 카테고리: {selectedCategory}</p>
                </div>
            )}
        </Modal>
        </>
    );
};

export default CategoryModal;
