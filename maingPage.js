// import React from 'react';

function MainPage() {
    return (
        <wrapper>
        <header>
            <div id="logo">
                <Link to="/"><img class="logoImg" src="https://placeholder.com/163x38" /></Link>
            </div>
            <div>
                <div id="login">
                    <Link to="/"><img class="loginImg" src="https://placeholder.com/150x38" /></Link>
                </div>
                <div id="register">
                    <Link to="/"><img class="registerImg" src="https://placeholder.com/150x38" /></Link>
                </div>
            </div>
        </header>

        <section>
            <div id="topSector">
                <h1>소비자 중심의 역경매 시스템의 시작 북스탁</h1>
                <input id="mainSearchbar" type="search" />
                <button id="searchImg"><img src="https://placeholder.com/10x10" /></button>
                <div>
                    <button id="buying">삽니다</button>
                    <button id="selling">팝니다</button>
                </div>
                <div id="mainNavigator">
                    <Link to="/" class="1"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="2"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="3"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="4"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="5"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="6"><img src="https://placeholder.com/85x76" /></Link>
                    <Link to="/" class="7"><img src="https://placeholder.com/85x76" /></Link>
                </div>
            </div>

            <div id="middleSector">
                <div id="middleSectorTopbar">
                    <h1 id="middleSectorTitle">최신상품안내</h1>
                    <Link to="/"id="moreItem">+ 더보기</Link>
                </div>

                <div id="lastestItem1">
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>삽니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                </div>

                <div id="lastestItem2">
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>삽니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>팝니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                    <div>
                        <button>삽니다</button>
                        <Link to="/"><h3>어린왕자</h3></Link>
                        <span>판매중 | 소설 | ~2023-09-03</span>
                    </div>
                </div>

                <div id="trading">
                    <h1>북스탁 거래현황</h1>
                    <h4>판매자와 구매자 모두 만족하는 스마트한 도서 쌍방향 거래시스템</h4>
                    <div id="tradingImg">
                        <div>
                            <img src="https://placeholder.com/85x76" />
                            <h3>삽니다 상품</h3>
                            <h3>총 225건</h3>
                        </div>

                        <div>
                            <img src="https://placeholder.com/85x76" />
                            <h3>팝니다 상품</h3>
                            <h3>총 38,904건</h3>
                        </div>

                        <div>
                            <img src="https://placeholder.com/85x76" />
                            <h3>누적 판매완료</h3>
                            <h3>총 30,637건</h3>
                        </div>
                    </div>
                </div>

                <div id="guide">
                    <Link to="/"><img src="https://placeholder.com/85x76" /></Link>
                </div>

                <div id="community">
                    <h1>커뮤니티</h1>
                    <Link to="/">+ 더보기</Link><br />
                    <Link to="/">어린왕자를 읽고 느낀점</Link><br />
                    <Link to="/">거래후기</Link><br/>
                    <Link to="/">직거래 후기 올립니다</Link><br />
                    <Link to="/">6개월 절판도서 구매후 재태크 사용후기</Link><br />
                    <Link to="/">태풍온다고 하던데...</Link><br />
                </div>

                <div id="knowledge">
                    <h1>도서지식</h1>
                    <Link to="/">+ 더보기</Link><br />
                    <Link to="/">어린왕자를 읽고 느낀점</Link><br />
                    <Link to="/">거래후기</Link><br />
                    <Link to="/">직거래 후기 올립니다</Link><br />
                    <Link to="/">6개월 절판도서 구매후 재태크 사용후기</Link><br />
                    <Link to="/">태풍온다고 하던데...</Link><br />
                </div>
            </div>

            <div id="bottomSector">
                <div id="blogLink">
                    <Link to><img src="https://placeholder.com/85x76" /></Link>
                </div>

                <div id="marketingVideo">
                    <Link to><img src="https://placeholder.com/85x76" /></Link>
                </div>
            </div>
        </section>

        <footer>
            <div id="footerNav">
                <Link to="/">서비스안내</Link>
                <Link to="/">이용약관</Link>
                <Link to="/">메일무단수집거부</Link>
                <Link to="/">개인정보처리방침</Link>
                <Link to="/">고객센터</Link>
                <Link to="/">관리자쪽지</Link>
            </div>

            <div id="companyInfo">
                <p>북스탁   사업자등록번호:514-81-28277 대표번호:1900-2896</p><br/>
                <span>COPYRIGHT(C) 2023 북스탁 RIGHTS RESERVED</span>
            </div>
        </footer>
    </wrapper>
    );
  }
  
  export default MainPage;
  