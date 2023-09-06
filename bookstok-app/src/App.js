import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SignIn from "./pages/signIn";
import SearchResult from "./pages/searchResult";
import Trading from "./pages/Trading";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/trading" element={<Trading />} />
      </Routes>
    </Router>
  );
}

export default App;
