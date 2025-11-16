# 📚 BookStock

중고 도서 경매 플랫폼 - 책을 사고파는 새로운 방법

## 📖 프로젝트 소개

BookStock은 중고 도서를 경매 방식으로 거래할 수 있는 웹 플랫폼입니다. 사용자는 읽지 않는 책을 등록하여 경매에 올리고, 원하는 책을 검색하여 입찰할 수 있습니다. 실시간 채팅 기능과 북스탁페이 포인트 시스템을 통해 안전하고 편리한 거래 경험을 제공합니다.

## 🏗️ 프로젝트 구조

```
Bookstock/
├── bookstok-app/              # React 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── pages/             # 페이지 컴포넌트
│   │   ├── redux/             # Redux 상태 관리
│   │   └── contexts/          # React Context
│   └── public/
├── bookstok-api-server/       # Express.js 백엔드 API 서버
│   ├── routes/                # API 라우트
│   ├── models/                # 데이터베이스 모델
│   ├── middlewares/           # 커스텀 미들웨어
│   ├── config/                # 설정 파일
│   └── public/                # 정적 파일 (이미지 등)
├── bookstok-chatio-server/    # Socket.io 실시간 채팅 서버
├── doc/                       # 데이터베이스 스키마 및 문서
└── frontend/                  # 레거시 프론트엔드 파일
```

## 🛠️ 기술 스택

### Frontend
- **React** 18.2.0 - UI 라이브러리
- **Redux Toolkit** - 상태 관리
- **React Router** - 라우팅
- **Bootstrap** & **React Bootstrap** - UI 프레임워크
- **Axios** - HTTP 클라이언트
- **Socket.io-client** - 실시간 통신
- **React Slick** - 캐러셀
- **React Icons** - 아이콘
- **Moment.js** - 날짜/시간 처리

### Backend
- **Node.js** & **Express.js** - 서버 프레임워크
- **MySQL2** - 데이터베이스
- **Socket.io** - 실시간 양방향 통신
- **Express Session** - 세션 관리
- **CORS** - Cross-Origin Resource Sharing
- **Multer** - 파일 업로드
- **Greenlock Express** - HTTPS/SSL 인증서 관리
- **dotenv** - 환경 변수 관리

### Development Tools
- **Nodemon** - 개발 서버 자동 재시작
- **Prettier** & **ESLint** - 코드 포매팅 및 린팅
- **Cross-env** - 환경 변수 설정

## ✨ 주요 기능

### 1. 회원 관리
- 일반 회원가입 및 로그인
- 카카오 소셜 로그인
- 비밀번호 찾기
- 회원 정보 수정

### 2. 경매 시스템
- 도서 등록 및 경매 생성
- 경매 상품 검색 (제목, 카테고리 등)
- 입찰 기능
- 경매 종료 처리
- 최근 조회한 경매 기록 (쿠키 기반)

### 3. 거래 기능
- 경매 낙찰 처리
- 구매 확정
- 거래 내역 조회

### 4. 북스탁페이
- 포인트 충전
- 포인트 출금
- 잔액 조회
- 거래 시 포인트 사용

### 5. 검색 기능
- 도서 통합 검색
- 카테고리별 검색
- 최근 검색어
- 즐겨찾기 검색

### 6. 실시간 채팅
- Socket.io 기반 1:1 채팅
- 채팅 내역 저장 및 로드
- 실시간 메시지 전송/수신

### 7. 마이페이지
- 내 정보 관리
- 경매 등록 내역
- 입찰 내역
- 거래 내역
- 포인트 관리
- 최근 검색어 및 즐겨찾기

## 🚀 시작하기

### 필수 요구사항
- Node.js (v14 이상)
- MySQL (v8.0 이상)
- npm 또는 yarn

### 설치 및 실행

#### 1. 저장소 클론
```bash
git clone [repository-url]
cd Bookstock
```

#### 2. API 서버 설정 및 실행
```bash
cd bookstok-api-server
npm install

# 환경 변수 설정
# .env, .env.development, .env.production 파일 생성 필요

# 개발 모드
npm run dev

# 로컬 모드
npm run local

# 프로덕션 모드
npm start
```

#### 3. 프론트엔드 앱 설정 및 실행
```bash
cd bookstok-app
npm install

# 환경 변수 설정
# .env, .env.development, .env.production 파일 생성 필요

# 개발 모드
npm start

# 빌드
npm run build
```

#### 4. 채팅 서버 설정 및 실행
```bash
cd bookstok-chatio-server
npm install

# 서버 시작
npm start
```

### 환경 변수 설정

각 서버는 환경 변수 파일이 필요합니다. 다음 파일들을 생성하세요:

**bookstok-api-server/.env**
```
# 데이터베이스 설정
DB_HOST=your_db_host
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=bookstock

# 세션 설정
SESSION_SECRET=your_session_secret
```

**bookstok-app/.env**
```
REACT_APP_API_URL=http://localhost:12345/api
REACT_APP_CHAT_URL=http://localhost:54321
```

## 📡 API 엔드포인트

### 인증
- `POST /api/users/login` - 로그인
- `POST /api/users/signup` - 회원가입
- `POST /api/users/logout` - 로그아웃
- `POST /api/lostPwd` - 비밀번호 찾기

### 경매
- `GET /api/auctions/search` - 경매 검색
- `GET /api/auctions/:id` - 경매 상세 조회
- `POST /api/auctions` - 경매 등록
- `PATCH /api/auctions/:id` - 경매 종료

### 거래
- `GET /api/trading` - 거래 목록 조회
- `POST /api/trading` - 거래 생성
- `PATCH /api/trading/:id` - 거래 상태 변경

### 포인트
- `GET /api/point/balance` - 잔액 조회
- `POST /api/point` - 포인트 충전
- `POST /api/point/withdraw` - 포인트 출금

### 마이페이지
- `GET /api/mypage` - 마이페이지 정보 조회
- `PUT /api/mypage` - 회원 정보 수정

### 검색
- `GET /api/search` - 통합 검색

### 파일 업로드
- `POST /api/upload` - 이미지 업로드

## 🗄️ 데이터베이스

MySQL 데이터베이스를 사용하며, 스키마 파일은 `doc/` 디렉토리에 있습니다:
- `bookstok.sql` - 초기 스키마
- `bookstok 2차 수정.sql`, `bookstok 3차 수정.sql`, `bookstok 4차 수정.sql` - 스키마 업데이트

주요 테이블:
- `user` - 사용자 정보
- `auctions` - 경매 정보
- `trading` - 거래 정보
- `chats` - 채팅 내역
- 기타 관련 테이블

## 🌐 배포

### 포트 설정
- **API 서버**: 12345 (HTTP), HTTPS 포트는 greenlock 설정 참조
- **프론트엔드**: 3000 (개발), 빌드 파일은 API 서버에서 제공
- **채팅 서버**: 54321

### HTTPS 설정
API 서버는 Greenlock Express를 사용하여 자동으로 SSL 인증서를 관리합니다.
- 설정 파일: `bookstok-api-server/.greenlockrc`
- 인증서 저장 위치: `bookstok-api-server/greenlock.d/`

### 프로덕션 배포
프로덕션 환경에서는 API 서버가 빌드된 React 앱을 제공합니다:
```bash
# React 앱 빌드
cd bookstok-app
npm run build

# API 서버 프로덕션 모드 실행
cd ../bookstok-api-server
npm start
```

## 🔒 보안 고려사항

- 세션 기반 인증 사용
- CORS 설정으로 허용된 도메인만 접근 가능
- SQL Injection 방지를 위한 Prepared Statements 사용
- 환경 변수를 통한 민감 정보 관리
- HTTPS를 통한 암호화된 통신

## 📝 개발 컨벤션

### 코드 스타일
- Prettier를 사용한 코드 포매팅
- ESLint를 사용한 코드 품질 관리

### Git 커밋 메시지
- 일관된 커밋 메시지 작성
- 의미 있는 커밋 단위 유지

## 🐛 알려진 이슈

- 채팅 서버의 데이터베이스 연결 정보가 하드코딩되어 있음 (환경 변수로 이동 필요)
- SQL Injection 취약점 존재 (일부 쿼리에서 문자열 보간 사용)

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 private 프로젝트입니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**Made with ❤️ by BookStock Team**
