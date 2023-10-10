// Notice.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notice.css';


const Notice = ({ notifications = [] }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // notifications 배열의 길이를 사용하여 읽지 않은 알림의 개수를 업데이트
        setUnreadCount(notifications.length);
    }, [notifications]);

    const notify = (notificationData) => {
        if (notifications.length === 0) {
            toast.info('새로운 알림이 없습니다.');
            return;
        }

        // 모든 알림을 토스트로 표시
        notifications.forEach((notificationData) => {
            const notificationMessage = 
            <div>
                새로운 판매자 입찰이 등록되었습니다.
                가격: {notificationData.price} 원<br/>
                상세내용: {notificationData.details}
            </div>
            console.log('Notification Message:', notificationMessage); // 추가된 부분
            // 판매자 아이디: ${notificationData.sellerId};
            toast.success(notificationMessage);
        });
    };

    return (
        <div className='header-notice'>
            <button
                type="button"
                onClick={notify} // 기존의 마지막 알림을 가져오는 로직 제거
                className="btn btn-primary position-relative custom-button text-secondary-emphasis-notice"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="dimgray"
                    className="bi bi-bell-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount > 0 ? unreadCount : null}
                </span>
            </button>

            <ToastContainer />
        </div>
    );
};

export default Notice;
