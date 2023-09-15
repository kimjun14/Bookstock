import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import './App.css';
import SignIn from "./pages/signIn/newSignin";
import SearchResult from "./pages/searchResult/newIndex";
import Trading from "./pages/Trading";
import MainPage from "./pages/mainPage";
import SignUp from "./pages/signUp/newIndex";
import MyPage from "./pages/myPage";
import BookSignUp from "./pages/bookSignUp/variant";

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
          <Route path="/booksignup" element={<BookSignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
