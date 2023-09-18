import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function Chat({ isOpen, bid, onClose }) {
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const socketRef = useRef(null);

    const handleInputChange = (e) => {
        setChatMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (chatMessage.trim() !== '') {
            // 메시지를 채팅 기록에 추가
            setChatHistory([...chatHistory, { text: chatMessage, sender: 'user' }]);
            // 웹소켓을 통해 서버에 메시지 전송
            socketRef.current.emit('chat message', { text: chatMessage, sender: 'user' });
            // 메시지 입력 필드 초기화
            setChatMessage('');
        }
    };

    useEffect(() => {
        socketRef.current = io.connect('http://localhost:54321');
    
        socketRef.current.on('chat message', (message) => {
            setChatHistory((prevLog) => [...prevLog, message]);
        });
    
        return () => {
          socketRef.current.disconnect();
        };
    }, []);    

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
                                            className={`d-flex flex-row justify-content-${message.sender === 'user' ? 'start' : 'end'} mb-4`}
                                        >
                                            {message.sender === 'user' ? (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="avatar 1" style={{ width: '45px', height: '100%' }} />
                                            ) : null}
                                            <div className={`p-3 ${message.sender === 'user' ? 'ms-3' : 'me-3'} ${message.sender === 'user' ? 'bg-info' : 'bg-light'}`} style={{ borderRadius: '15px' }}>
                                                <p className="small mb-0">{message.text}</p>
                                            </div>
                                            {message.sender !== 'user' ? (
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 2" style={{ width: '45px', height: '100%' }} />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                                {/* 채팅 입력 필드 */}
                                <div className="form-outline">
                                    <textarea className="form-control" rows="2" value={chatMessage} onChange={handleInputChange}></textarea>
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
