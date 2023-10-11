import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './withdraw.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
}

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 576 })
    return isMobile ? children : null
}

const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 577, maxWidth: 1023 })
    return isTablet ? children : null
}


const Withdraw = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [points, setPoints] = useState('');
    const [balance, setBalance] = useState(0); // 잔액 상태 추가
    const [selectedBank, setSelectedBank] = useState('');
    const navigate = useNavigate();

    const axiosConnect = axios.create({
        baseURL: 'http://localhost:12345/api',
        withCredentials: true
    });

    const handleDeductPoints = async () => {
        try {
            // 출금 금액이 음수이거나 숫자가 아닌 경우 경고창 띄우기
            const pointsValue = parseInt(points.replace(/,/g, ''), 10);

            if (pointsValue <= 0 || isNaN(pointsValue)) {
                alert("올바른 출금 금액을 입력하세요.");
                return;
            }

            // 출금 금액이 사용 가능한 잔액을 초과하는지 확인
            if (pointsValue > balance) {
                alert("출금 금액이 사용 가능한 잔액을 초과합니다.");
                return;
            }

            const response = await axiosConnect.post('/point/withdraw', {
                accountNumber,
                point: pointsValue,
            });

            console.log(response.data);
            alert("출금이 완료되었습니다.");

            // 출금이 성공하면 잔액을 업데이트
            fetchBalance();

            // 출금이 성공하면 마이페이지로 돌려보냄
            navigate('/mypage');
        } catch (error) {
            console.error('포인트 출금 중 에러:', error.response ? error.response.data.message : '네트워크 에러');
        }
    };

    const fetchBalance = async () => {
        try {
            const response = await axiosConnect.get('/point/balance');
            setBalance(response.data.balance);
        } catch (error) {
            console.error('잔액 조회 중 에러:', error.response ? error.response.data.message : '네트워크 에러');
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트되었을 때 잔액을 불러옴
        fetchBalance();
    }, []);

    const handleWithdrawCash = (e) => {
        // 정규식을 사용하여 콤마가 찍힌 숫자인지 확인
        const isCommaSeparatedNumber = /^[0-9,]+$/.test(e.target.value);

        if (isCommaSeparatedNumber) {
            // 예전 콤마 제거하고 새로운 값에 3자리마다 콤마 추가
            const amountWithoutComma = e.target.value.replace(/,/g, '');
            const formattedAmount = parseInt(amountWithoutComma || 0, 10).toLocaleString();

            // setPoints 업데이트
            setPoints(formattedAmount);
        } else if (e.target.value === '' || e.nativeEvent.inputType === 'deleteContentBackward') {
            // 입력 값이 비어있거나 Backspace 이벤트인 경우
            setPoints('');
        } else {
            // 숫자 또는 콤마가 아닌 다른 문자가 포함된 경우 처리
            console.error("Invalid input. Please enter a valid number with or without commas.");
        }
    };
    const banks = [
        '은행을 선택하세요',
        '국민은행',
        '신한은행',
        '우리은행',
        '하나은행',
        '기업은행',
        '농협은행',
        '우체국',
        '대구은행',
        '부산은행',
        '광주은행',
        'KEB하나은행',
        'SC제일은행',
    ];


    const handleBankChange = (e) => {
        setSelectedBank(e.target.value);
        console.log(selectedBank);
    };

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
        console.log(accountNumber);
    };

    const accountCheck = async () => {
        try {
            const result = await axiosConnect.get(`/trading/account`);
            setSelectedBank(result.data.sellerBank);
            setAccountNumber(result.data.sellerAccount)
        } catch (err) {
            console.error(err);
        }
    }

    const handleConfirmAccountNumber = async () => {
        const confirmAccountNumber = window.confirm("계좌번호를 저장하시겠습니까? 저장 후 취소할 수 없습니다.");
        if (confirmAccountNumber) {
            // 계좌번호 변경을 서버에 요청하고 DB를 업데이트하는 코드를 추가하세요.
            // axios 또는 fetch를 사용하여 서버로 요청을 보낼 수 있습니다.
            try {
                await axiosConnect.patch(`/trading/account`, { "userAccount": accountNumber, /* "userBank": selectedBank */ });
                alert("계좌 입력 성공");
            } catch (err) {
                console.error(err);
            }
        }
        accountCheck();
    };
    return (
        <>
            <Desktop>
                <div className='withdrawContainer text-center'>
                        <label className='account-label'>
                            계좌번호: <br />
                            <select className="form-select mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                            {banks.map((bank, index) => (
                                <option key={index} value={bank}>
                                    {bank}
                                </option>
                            ))}
                            </select>
                            <input type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                        </label>
                            
                        
                        <br />
                        <button className="mb-5 btn btn-blue-account" onClick={handleConfirmAccountNumber}>계좌번호 저장</button>
                        <br />
                        

                    <label>
                        출금할 포인트:
                        <input type="text" value={points} onChange={handleWithdrawCash} />
                    </label>
                    <br />
                    <p>잔액: {balance.toLocaleString()} 포인트</p> {/* 잔액을 표시하는 부분 추가 */}
                    <button type="button" className="btn btn-blue-account" onClick={handleDeductPoints}>출금하기</button>
                </div>
            </Desktop>
            <Tablet>
                <div className='withdrawContainer text-center'>
                <label className='account-label'>
                            계좌번호: <br />
                            <select className="form-select mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                            {banks.map((bank, index) => (
                                <option key={index} value={bank}>
                                    {bank}
                                </option>
                            ))}
                            </select>
                            <input type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                        </label>
                        <br />
                        <button className="mb-5 btn btn-blue-account" onClick={handleConfirmAccountNumber}>계좌번호 저장</button>
                        <br />
                    <label className='mt-1'>
                        출금할 포인트:
                        <input className="pointInput" type="text" value={points} onChange={handleWithdrawCash} />
                    </label>
                    <br />
                    <p>잔액: {balance} 포인트</p> {/* 잔액을 표시하는 부분 추가 */}
                    <button type="button" className="btn btn-primary" onClick={handleDeductPoints}>출금하기</button>
                </div>
            </Tablet>
            <Mobile>
                <div className='withdrawContainer text-center'>
                <label className='account-label'>
                            계좌번호: <br />
                            <select className="form-select mb-3 mt-3" value={selectedBank} onChange={handleBankChange}>
                            {banks.map((bank, index) => (
                                <option key={index} value={bank}>
                                    {bank}
                                </option>
                            ))}
                            </select>
                            <input type="text" placeholder="하이픈(-)을 제외하고 입력하세요" value={accountNumber} onChange={handleAccountNumberChange} />
                        </label>
                        <br />
                        <button className="mb-5 btn btn-blue-account" onClick={handleConfirmAccountNumber}>계좌번호 저장</button>
                        <br />
                    <label className='mt-3'>
                        출금할 포인트:
                        <input className="pointInput" type="text" value={points} onChange={handleWithdrawCash} />
                    </label>
                    <br />
                    <p>잔액: {balance} 포인트</p> {/* 잔액을 표시하는 부분 추가 */}
                    <button type="button" className="btn btn-primary" onClick={handleDeductPoints}>출금하기</button>
                </div>
            </Mobile>
        </>
    );
};

export default Withdraw