// ChatBot.js 파일

import React, { Component } from 'react';

class ChatBotButton extends Component {
  componentDidMount() {
    // Kakao SDK 스크립트를 불러옴
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js';
    script.async = true;
    script.onload = () => {
      // Kakao SDK 초기화
      window.Kakao.init('16c658f345d45488e891c23d864eeab4'); // 사용하려는 앱의 JavaScript 키 입력
    };
    document.body.appendChild(script);
  }

  chatChannel() {
    // 카카오톡 채널 채팅 열기
    window.Kakao.Channel.chat({
      channelPublicId: 'http://pf.kakao.com/_TRHdG/chat', // 채널 아이디 입력
    });
  }

  render() {
    return (
      <div>
        <a id="chat-channel-button" href="javascript:void(0);" onClick={this.chatChannel.bind(this)}>
          <img src="./ChatBotImg.png" alt="카카오톡 채널 채팅하기 버튼" />
        </a>
      </div>
    );
  }
}

export default ChatBotButton;
