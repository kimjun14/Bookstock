import { Link } from "react-router-dom"

const MyPage = function () {
  return(
    <div className="nav-item">
      <Link to="/mypage" className="nav-link text-secondary-emphasis" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3Z" />
          </svg>
          <span style={{ fontSize: '12px', marginTop: '6px' }}>MYPAGE</span>
      </Link>
    </div>
  );
};

export default MyPage;