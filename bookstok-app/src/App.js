import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import SignIn from './pages/signIn/index';
import SearchResult from './pages/searchResult/newIndex';
import Trading from './pages/Trading';
import MainPage from './pages/mainPage';
import SignUp from './pages/signUp';
import MyPage from './pages/myPage';
import BookSignUp from './pages/bookSignUp/variant';
import { AuthProvider } from './AuthContext';
import LostPwd from './pages/lostPwd';
import ModalComponent from './pages/Trading/buying';
import BuyingSuccess from './pages/Trading/buyingSuccess';
import RecentSearch from './pages/myPage/search/recentSearch'
import FavoriteSearch from './pages/myPage/search/favSearch'
import Deposit from './pages/myPage/payment/deposit';
import Withdraw from './pages/myPage/payment/withdraw';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const [notifications, setNotifications] = useState([]);

  const handleBidRegistration = (bidInfo) => {
    setNotifications([...notifications, bidInfo]);
  };

  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/searchResult" element={<SearchResult />} />
              <Route path="/login" element={<SignIn />} />
              <Route
                path="/trading"
                element={<Trading onBidRegistration={handleBidRegistration} />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/booksignup" element={<BookSignUp />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/lostPwd" element={<LostPwd />} />
              <Route path="/buying" element={<ModalComponent />} />
              <Route path="/buyingSuccess" element={<BuyingSuccess />} />
              <Route path="/recentSearch" element={<RecentSearch />} />
              <Route path="/favorites" element={<FavoriteSearch />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
            </Route>
          </Routes>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
