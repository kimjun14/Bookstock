-- -----------------------------------------------------
-- 회원가입 // INSERT
-- 아이디, 비밀번호, 닉네임, 전화번호, 주소, 계좌번호
-- -----------------------------------------------------
select * from user;
INSERT INTO 
	user 
		(userId, pwd, nick, userPhone,userAccount,userAddr) 
	VALUES 
		('test001', 'testpwd', 'testnick','01012345678','123456789012','서울특별시 강남구 역삼동 테헤란로 212');
-- -----------------------------------------------------
-- 회원정보 수정 // UPDATE
-- 비밀번호, 닉네임, 전화번호, 주소, 계좌번호
-- 비밀번호만 바꾸는 상황을 기준으로 작성함 
-- -----------------------------------------------------
select * from user;
UPDATE 
	user
SET
	pwd = 'testpwd2',
    nick = nick,
    userPhone = userPhone,
    userAccount = userAccount
WHERE userId='test001';
-- -----------------------------------------------------
-- 경매 등록 // INSERT
-- auctionId -> 숫자 자동 증가 (AI), auctionStart -> current_timestamp가 디폴트로 작성 됨
-- auctionEnd는 current_timestamp + interval X day로 x일 뒤로 저장
-- 이미지 주소는 img/auction이라는 폴더를 고정으로 둔다고 가정
-- uId는 외래키이므로 반드시 userNo 컬럼에 값이 있는걸 넣어야함
-- -----------------------------------------------------
select * from auction;
INSERT INTO 
	auction 
		(bid, auctionEnd, auctionImgSrc, auctionContext,uId) 
	VALUES 
		('10000', current_timestamp + interval 7 day, '001.jpg','대충 내가 이런이런이유로 살거다',2);
-- -----------------------------------------------------
-- 책 정보 등록 // INSERT
-- bookId는 외래키이므로 반드시 auctionId 컬럼에 값이 있는걸 넣어야함
-- 경매 등록하면서 동시에 책 정보도 같이 등록 되는것으로 가정함
-- 나머지 data는 API에서 반환되는 값을 사용
-- API에선 20210908 이렇게 주지만 DB 쿼리문에 넣을때는 '2021-09-08' 이렇게 넣어야함
-- -----------------------------------------------------
select * from book;
INSERT INTO 
	book 
		(aId, bookTitle, bookAuthor, bookPub, bookPubDate, isbn, bookText) 
	VALUES 
		(2,'Real MySQL 8.0 (1권) (개발자와 DBA를 위한 MySQL 실전 가이드)', '백은빈', '위키북스','2021-09-08','9791158392703','MySQL 서버를 활용하는 프로젝트에 꼭 필요한 경험과...');
-- -----------------------------------------------------
-- 입찰 등록 // INSERT
-- bidId -> 숫자 자동 증가 (AI)
-- 이미지 주소는 img/bid라는 폴더를 고정으로 둔다고 가정
-- aId는 외래키이므로 반드시 auction.auctionId 컬럼에 값이 있는걸 넣어야함
-- uId는 외래키이므로 반드시 user.userId 컬럼에 값이 있는걸 넣어야함
-- -----------------------------------------------------
select * from bid;
INSERT INTO 
	bid 
		(bidPrice, bidImgSrc, bidContext, aId, uId) 
	VALUES 
		('9000','001.jpg','이런상태인데 이런이유로 팝니다',2,4);
