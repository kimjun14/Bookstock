import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import './App.css';
import SignIn from "./pages/signIn";
import SearchResult from "./pages/searchResult";
import Trading from "./pages/Trading";
import MainPage from "./pages/mainPage";
import SignUp from "./pages/signUp";
import MyPage from "./pages/myPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
