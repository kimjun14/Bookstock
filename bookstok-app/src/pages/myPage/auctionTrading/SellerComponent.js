import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function SellerComponent() {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const [isInvoiceInputComplete, setIsInvoiceInputComplete] = useState(false);
    const [isAccountInputComplete, setIsAccountInputComplete] = useState(false);
    const [isInvoiceEditMode, setIsInvoiceEditMode] = useState(true);
    const [isAccountEditMode, setIsAccountEditMode] = useState(true);

    const handleInvoiceNumberChange = (e) => {
        setInvoiceNumber(e.target.value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleInvoiceInputComplete = () => {
        // DB에 송장번호 업데이트 로직 추가
        // 업데이트가 성공하면 스타일 및 상태 변경
        setIsInvoiceInputComplete(true);
    };

    const handleAccountInputComplete = () => {
        // DB에 계좌번호 업데이트 로직 추가
        // 업데이트가 성공하면 스타일 및 상태 변경
        setIsAccountInputComplete(true);
    };

    return (
        <div>
            {/* 송장번호 입력창 */}
            <h3>송장번호 입력</h3>
            <Form.Control
                type="text"
                placeholder="송장번호를 입력하세요"
                value={invoiceNumber}
                onChange={handleInvoiceNumberChange}
                readOnly={!isInvoiceEditMode || isInvoiceInputComplete}
            />
            {!isInvoiceInputComplete && (
                <Button onClick={isInvoiceEditMode ? handleInvoiceInputComplete : () => setIsInvoiceEditMode(true)}>
                    {isInvoiceEditMode ? "입력 완료" : "수정"}
                </Button>
            )}

            {/* 계좌번호 입력창 */}
            <h3>계좌번호 입력</h3>
            <Form.Control
                type="text"
                placeholder="계좌번호를 입력하세요"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                readOnly={!isAccountEditMode || isAccountInputComplete}
            />
            {!isAccountInputComplete && (
                <Button onClick={isAccountEditMode ? handleAccountInputComplete : () => setIsAccountEditMode(true)}>
                    {isAccountEditMode ? "입력 완료" : "수정"}
                </Button>
            )}
        </div>
    );
}

export default SellerComponent;
