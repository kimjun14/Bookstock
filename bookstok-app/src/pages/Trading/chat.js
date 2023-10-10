import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import io from 'socket.io-client';

function Chat({ isOpen, bid, onClose }) {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [nickname, setNickname] = useState('');
    const socketRef = useRef(null);
    const URLquery = useLocation();
    const queryParams = new URLSearchParams(URLquery.search);

    const handleInputChange = (e) => {  // 입력 한 내용을 chatMessage로 반영하는 이벤트 핸들러
        setChatMessage(e.target.value);
    };

    const handleKeyPress = (e) => {     // 엔터키를 입력하면 메세지 전송 함수가 실행하게 하는 이벤트 핸들러
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
            e.preventDefault(); // Enter 키에 의한 기본 동작(예: 폼 제출)을 방지
        }
    };

    const handleSendMessage = () => {
        if (chatMessage.trim() !== '') {
            // 웹소켓을 통해 서버에 메시지 전송
            socketRef.current.emit('chat message', { text: chatMessage, sender: nickname, bId: bid.bidId, aId:queryParams.get('id') });
            // 메시지 입력 필드 초기화
            setChatMessage('');
        }
    };

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:12345',{
            withCredentials: true
        });
        
        socketRef.current.on('get nickname',(nick)=>{
            setNickname(nick)
        })
        
        if(bid!=null){  // bid값이 null인 초기엔 채팅 이력을 받아오지 않음
            socketRef.current.emit('check chatId', { aId:queryParams.get('id'), bId: bid.bidId });
            socketRef.current.on('load previous messages', (previousMessages) => {
                setChatHistory(previousMessages);
        })};

        socketRef.current.on('new message', (message) => {
            setChatHistory((prevLog) => [...prevLog, message]);
        });
    
        return () => {
          socketRef.current.disconnect();
        };
    }, [bid]);    

    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">1:1 채팅</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {bid && (
                            <div>
                                <p>상품 정보: {bid.bidContext}</p>
                                {/* 채팅 내용 표시 */}
                                <div className="chat-history">
                                    {chatHistory.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`d-flex flex-row justify-content-${message.sender === nickname ? 'start' : 'end'} mb-4`}
                                        >
                                            {message.sender === nickname ? (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                            ) : null}{message.sender}
                                            <div className={`p-3 ${message.sender === nickname ? 'ms-3' : 'me-3'} ${message.sender === 'user' ? 'bg-info' : 'bg-light'}`} style={{ borderRadius: '15px' }}>
                                                <p className="small mb-0">{message.text}</p>
                                            </div>
                                            {message.sender !== nickname ? (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 2" style={{ width: '45px', height: '100%' }} />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                                {/* 채팅 입력 필드 */}
                                <div className="form-outline">
                                    <textarea className="form-control" rows="2" value={chatMessage} onChange={handleInputChange} onKeyPress={handleKeyPress}></textarea>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            닫기
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSendMessage}>
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Chat;
