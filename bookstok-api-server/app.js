const dotenv = require("dotenv");

// 기본 .env 파일 로딩
dotenv.config({ path: ".env" });
// 환경별 .env 파일 로딩
console.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var app = express();
let clients=[];
const sessionMiddleware = session({
    cookie: { 
        maxAge: 1000*60*60*24*7,
        httpOnly: false,
        SameSite:'None',
        secure:true
    },
    secret: 'sometext', // 세션 데이터 암호화를 위한 비밀 키 (보안 목적)
    rolling: true,  // 매 응답마다 쿠키 시간 초기화
    resave: false,  // false : 세션값이 수정되지 않으면 서버에 다시 저장하지 않음 // true : 매 응답마다 세션 저장
    saveUninitialized: true
  });

app.use(cors({
    origin:'http://localhost:12345', // 클라이언트 도메인 주소
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/images', express.static('public/images'));
app.use(express.static(path.join(__dirname, "..", "bookstok-app", "build")));


app.use(sessionMiddleware);  // req.session 속성을 만들어서 세션 객체를 저장

app.use('/api', indexRouter);
app.use(express.static('public'));
app.get('/notifications', (req, res) => {
    res.json({data:"응답 테스트"})
  });

app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "bookstok-app", "build", "index.html"));
});

// 404 에러 처리
app.use((req, res, next) => {
    console.error(404, req.url);
    res.json({error: {message: '존재하지 않는 API입니다.'}});
});

// 500 에러 처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err.cause);
    res.json({error: {message: '요청을 처리할 수 없습니다. 잠시 후 다시 요청해 주세요.'}});
});



module.exports = { app, sessionMiddleware };
