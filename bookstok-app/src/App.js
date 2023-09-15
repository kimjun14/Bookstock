import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css';
import SignIn from './pages/signIn/newSignin';
import SearchResult from './pages/searchResult/newIndex';
import Trading from './pages/Trading';
import MainPage from './pages/mainPage';
import SignUp from './pages/signUp';
import MyPage from './pages/myPage';
import BookSignUp from './pages/bookSignUp/variant';

import { AuthProvider } from './AuthContext'; // AuthContext 파일 경로에 따라 수정

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider 컴포넌트를 사용하여 하위 컴포넌트에서 상태를 공유할 수 있습니다. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/searchResult" element={<SearchResult />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/booksignup" element={<BookSignUp />} />
          </Route>
        </Routes>
      </AuthProvider> 
    </Router>
  );
}

export default App;
