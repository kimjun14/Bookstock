const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 도메인에서의 접근을 허용합니다. 실제 운영 환경에서는 특정 도메인을 지정해주세요.
    methods: ["GET", "POST"] // 허용하려는 메서드를 지정합니다.
  }
});

const pool = mysql.createPool({
  host: '13.124.253.233',
  port: '3306',
  user: 'bookstock',
  password: 'Bookstock12$$',
  database: 'bookstock'
});

// 로그 디렉토리와 파일 생성
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

app.use(cors()); // CORS 미들웨어 적용

io.on('connection', (socket) => {
  console.log('a user connected');

  // 기존의 채팅 내역 로드
  socket.on('check chatId', async (msg) => {
    const { bId, aId } = msg;
    try {
      const [rows] = await pool.execute(`SELECT * FROM chats where aId=${aId} and bId=${bId} ORDER BY timestamp DESC LIMIT 20`);
      // 처음으로 접속한 유저에게만 이전 채팅 내역 전송
      socket.emit('load previous messages', rows.reverse());
    } catch (error) {
        console.error('DB 에러:', error);
    } 
  });

  socket.on('chat message', async (msg) => {
    const { text, sender, bId, aId } = msg;
    try {
      // DB에 메시지 저장
      const [rows, fields] = await pool.execute(
        `INSERT INTO chats 
        (text, sender, bId, aId) 
        VALUES (?, ?, ?, ? )`,
        [text, sender, bId, aId]
      );

      // 모든 클라이언트에게 메시지 전송
      io.emit('new message', msg);
    } catch (error) {
      console.error('DB 에러:', error);
    }

    // 로그 파일에 기록
    fs.appendFileSync(path.join(logDirectory, 'access.log'), `${JSON.stringify(msg)}\n`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(54321, () => {    // 로컬로 돌릴려면 54321포트로 연결해야함
  console.log('listening on *:54321');
});