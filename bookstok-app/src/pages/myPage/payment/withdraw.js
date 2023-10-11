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
      
          // 서버의 API 엔드포인트와 포트를 실제로 사용 중인 것으로 바꿔주세요
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

    return (
        <>
            <Desktop>
                <div className='withdrawContainer text-center'>
                    <label>
                        계좌 번호:
                        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        출금할 포인트:
                        <input type="text" value={points} onChange={handleWithdrawCash} />
                    </label>
                    <br />
                    <p>잔액: {balance.toLocaleString()} 포인트</p> {/* 잔액을 표시하는 부분 추가 */}
                    <button type="button" className="btn btn-primary" onClick={handleDeductPoints}>출금하기</button>
                </div>
            </Desktop>
            <Tablet>
                <div className='withdrawContainer text-center'>
                    <label>
                        계좌 번호:
                        <input className="accountInput" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </label>
                    <br />
                    <label className='mt-3'>
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
                    <label>
                        계좌 번호:
                        <input className="accountInput" type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </label>
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