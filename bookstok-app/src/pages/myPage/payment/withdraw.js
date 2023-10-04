import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './withdraw.css';

const Withdraw = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [points, setPoints] = useState('');
    const [balance, setBalance] = useState(0); // 잔액 상태 추가

    const axiosConnect = axios.create({
        baseURL: 'http://localhost:12345/api',
        withCredentials: true
    });

    const handleDeductPoints = async () => {
        try {
            // 출금 금액이 음수이거나 숫자가 아닌 경우 경고창 띄우기
            if (parseInt(points) <= 0 || isNaN(parseInt(points))) {
                alert("올바른 출금 금액을 입력하세요.");
                return;
            }

            // 출금 금액이 사용 가능한 잔액을 초과하는지 확인
            if (parseInt(points) > balance) {
                alert("출금 금액이 사용 가능한 잔액을 초과합니다.");
                return;
            }

            // 서버의 API 엔드포인트와 포트를 실제로 사용 중인 것으로 바꿔주세요
            const response = await axiosConnect.post('/point/withdraw', {
                accountNumber,
                point: points,
            });

            console.log(response.data);
            alert("출금이 완료되었습니다.")
            // 출금이 성공하면 잔액을 업데이트
            fetchBalance();
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

    return (
        <div className='withdrawContainer text-center'>
            <label>
                계좌 번호:
                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            </label>
            <br />
            <label>
                출금할 포인트:
                <input type="text" value={points} onChange={(e) => setPoints(e.target.value)} />
            </label>
            <br />
            <p>잔액: {balance} 포인트</p> {/* 잔액을 표시하는 부분 추가 */}
            <button onClick={handleDeductPoints}>출금하기</button>
        </div>
    );
};

export default Withdraw