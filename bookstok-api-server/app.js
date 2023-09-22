var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
<<<<<<< HEAD
=======
// var fileuploadRouter = require('./routes/fileupload');
>>>>>>> d9b7b137c593a25ec49b4a6e4196c840011305c6

var app = express();

app.use(cors({
    origin:'http://localhost:3000', // 클라이언트 도메인 주소
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    cookie: { 
        maxAge: 1000*60*60*24*7,
        httpOnly: false,
        SameSite:'None'
    },
    secret: 'sometext', // 세션 데이터 암호화를 위한 비밀 키 (보안 목적)
    rolling: true,  // 매 응답마다 쿠키 시간 초기화
    resave: false,  // false : 세션값이 수정되지 않으면 서버에 다시 저장하지 않음 // true : 매 응답마다 세션 저장
    saveUninitialized: true,   // 초기화되지 않은 세션도 저장할지 여부
}));  // req.session 속성을 만들어서 세션 객체를 저장

app.use('/api', indexRouter);
<<<<<<< HEAD
app.use(express.static('public'));

=======
// app.use('/fileupload', fileuploadRouter);
>>>>>>> d9b7b137c593a25ec49b4a6e4196c840011305c6

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

module.exports = app;
