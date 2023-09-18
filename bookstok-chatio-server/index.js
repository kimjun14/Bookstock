const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 모든 도메인에서의 접근을 허용합니다. 실제 운영 환경에서는 특정 도메인을 지정해주세요.
    methods: ["GET", "POST"] // 허용하려는 메서드를 지정합니다.
  }
});

// 로그 디렉토리와 파일 생성
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

app.use(cors()); // CORS 미들웨어 적용

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log(msg)
    io.emit('chat message', msg);

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