// BuyerComponent.js
import React, { useState } from "react";
import TradingAddress from "../TradingAddress";
import './BuyerComponent.css'

function BuyerComponent() {
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });

    const banks = [
        '은행을 선택하세요',
        '국민은행',
        '신한은행',
        '우리은행',
        '하나은행',
        '기업은행',
    ];

    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
    };

    const handleDetailAddressChange = (e) => {
        setDetailAddress(e.target.value);
    };

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmPurchase = () => {
        const confirmPurchase = window.confirm("구매확정하시겠습니까? 구매확정 후 취소할 수 없습니다.");
        if (confirmPurchase) {
            // 여기에서 DB 업데이트 로직을 추가하세요.
            // axios 또는 fetch를 사용하여 서버로 업데이트 요청을 보낼 수 있습니다.
            // 업데이트가 성공하면 메시지를 표시하거나 다음 단계로 이동할 수 있습니다.
        }
    };

    return (
        <>
            <div>
                <h4 className="addressTitle">주소</h4>
                <input type="button" onClick={handleOpenModal} value="우편번호 찾기" />
                <input className="user_enroll_text" type="text" name="address" placeholder="주소를 입력하세요" value={enroll_company.address} onChange={handleInput} />
                <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소를 입력하세요" value={detailAddress} onChange={handleDetailAddressChange} />
                {isModalOpen && <TradingAddress company={enroll_company} setcompany={setEnroll_company} closeModal={handleCloseModal}></TradingAddress>}

                <h4>계좌번호</h4>
                <select className="form-select-sm mt-3" value={selectedBank} onChange={handleBankChange}>
                    {banks.map((bank, index) => (
                        <option key={index} value={bank}>
                            {bank}
                        </option>
                    ))}
                </select>
                <input className="mt-2" type="text" id="accountNumber" name="accountNumber" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                <button className="btn btn-blue mt-3" onClick={handleConfirmPurchase}>구매확정</button>
            </div>
        </>
    );
}

export default BuyerComponent;
