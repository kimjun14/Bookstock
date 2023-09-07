const Header = function(){
    <header>
    {/* 메인 상단 로고 */}
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div id="logo">
                <a href="/">
                    <img
                        className="logoImg"
                        src="./bookStockLogo 복사본.jpg"
                        alt="로고"
                        style={{
                            width: '200px',
                            marginLeft: '30%',
                        }}
                    />
                </a>
            </div>
            <form
                className="d-flex"
                role="search"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="도서를 검색하세요."
                    aria-label="Search"
                    style={{ width: '500px' }}
                />
                <button type="submit" style={{ border: 'none', background: 'none', padding: '0' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#000000', marginLeft: '10px' }}></i>
                </button>
            </form>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ position: 'absolute', top: '50%', left: '90%' }}>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li id="category">
                        <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                            <i className="fa-solid fa-bars" style={{ color: '#000000' }}></i>
                        </button>
                    </li>
                    <li id="Home">
                        <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                            <i className="fa-solid fa-house" style={{ color: '#000000' }}></i>
                        </button>
                    </li>
                    <li id="Profile">
                        <button style={{ border: 'none', background: 'none', padding: '0', margin: '0 15px' }}>
                            <i className="fa-solid fa-user" style={{ color: '#000000' }}></i>
                        </button>
                    </li>
                    <li id="Login">
                        <button style={{ border: 'none', background: 'none', padding: '0' }}>
                            <i className="fa-solid fa-arrow-right-to-bracket" style={{ color: '#000000' }}></i>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
}

export default Header;